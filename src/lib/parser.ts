import { ParseResult, TreeNode } from "./types";

/**
 * DSL (obj-like):
 *
 * Ex.:
 * {
 *   src: {
 *     main.tsx,
 *     routes.tsx,
 *     components: {
 *       Header: { index.tsx, index.test.tsx },
 *       Footer: { index.tsx, index.test.tsx },
 *       ...
 *     },
 *     ...
 *   },
 *   public: {
 *     index.html,
 *     assets: {
 *       images: { ... }
 *     }
 *   },
 *   next.config.ts,
 *   README.md,
 *   ...
 * }
 *
 * Regras:
 * - Pasta:  name ":" "{" ItemList? "}"
 *   - name pode ser "src" ou "[src]" (colchetes opcionais)
 * - Arquivo: token simples sem ":" (p.ex. "main.tsx")
 * - Ellipsis: "..." ou "…"  -> placeholder no mesmo nível
 * - Separador: vírgula entre itens; vírgula final é opcional
 * - Top-level: com ou sem chaves externas
 */

type TokKind =
  | "LBRACE"     // {
  | "RBRACE"     // }
  | "COLON"      // :
  | "COMMA"      // ,
  | "LBRACK"     // [
  | "RBRACK"     // ]
  | "ELLIPSIS"   // ... ou …
  | "NAME"       // qualquer nome (arquivo ou pasta)
  | "EOF";

type Tok = { kind: TokKind; val?: string; pos: number };

function isWhitespace(ch: string) {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

// caractere que delimita tokens (não pode estar dentro de "NAME")
function isDelimiter(ch: string) {
  return ch === "{" || ch === "}" || ch === ":" || ch === "," || ch === "[" || ch === "]";
}

function tokenize(input: string): Tok[] {
  const s = input;
  const out: Tok[] = [];
  let i = 0;

  const push = (kind: TokKind, val?: string, pos?: number) =>
    out.push({ kind, val, pos: pos ?? i });

  while (i < s.length) {
    const ch = s[i];

    // espaços
    if (isWhitespace(ch)) { i++; continue; }

    // pontuação
    if (ch === "{") { push("LBRACE", "{", i++); continue; }
    if (ch === "}") { push("RBRACE", "}", i++); continue; }
    if (ch === ":") { push("COLON", ":", i++); continue; }
    if (ch === ",") { push("COMMA", ",", i++); continue; }
    if (ch === "[") { push("LBRACK", "[", i++); continue; }
    if (ch === "]") { push("RBRACK", "]", i++); continue; }

    // ellipsis "..." ou "…"
    if (ch === ".") {
      if (s[i + 1] === "." && s[i + 2] === ".") {
        push("ELLIPSIS", "...", i);
        i += 3;
        continue;
      }
    }
    if (ch === "…") {
      push("ELLIPSIS", "…", i++);
      continue;
    }

    // NAME: qualquer sequência até encontrar delimitador/comma/brace/bracket/colon/whitespace
    let start = i;
    while (i < s.length && !isWhitespace(s[i]) && !isDelimiter(s[i]) && s[i] !== ".") {
      i++;
    }
    // permitir '.' dentro do NAME (ex.: next.config.ts, index.tsx)
    while (i < s.length) {
      if (isWhitespace(s[i]) || isDelimiter(s[i])) break;
      // aceita pontos como parte do nome
      i++;
    }

    const raw = s.slice(start, i).trim();
    if (raw.length > 0) {
      push("NAME", raw, start);
      continue;
    }

    // fallback: se nada foi consumido, consome 1 char para não travar
    i++;
  }

  push("EOF", "", i);
  return out;
}

function isEllipsisName(tok?: Tok) {
  return !!tok && (tok.kind === "ELLIPSIS" || tok.val === "..." || tok.val === "…");
}

function stripBrackets(name: string): string {
  // remove um par de colchetes simples, se presentes
  if (name.startsWith("[") && name.endsWith("]")) {
    return name.slice(1, -1).trim();
  }
  return name;
}

export function parseDSL(rawInput: string): ParseResult {
  const tokens = tokenize(rawInput);
  let idx = 0;
  const errors: string[] = [];

  const peek = () => tokens[idx];
  const next = () => tokens[idx++];

  const expect = (k: TokKind, msg?: string) => {
    const t = next();
    if (t.kind !== k) {
      errors.push(msg || `Esperado '${k}' em ${t.pos}`);
      return false;
    }
    return true;
  };

  function parseDocument(): TreeNode[] {
    // aceita com ou sem chaves no topo
    if (peek().kind === "LBRACE") {
      return parseGroup();
    }
    return parseItemListUntil("EOF");
  }

  function parseGroup(): TreeNode[] {
    expect("LBRACE", "Esperado '{' no início do bloco");
    const items = parseItemListUntil("RBRACE");
    expect("RBRACE", "Esperado '}' para fechar o bloco");
    return items;
  }

  function parseItemListUntil(stopKind: TokKind): TreeNode[] {
    const out: TreeNode[] = [];
    let first = true;

    while (true) {
      const t = peek();
      if (t.kind === stopKind || t.kind === "EOF") break;

      if (!first) {
        // vírgula entre itens (opcional para o primeiro)
        if (t.kind === "COMMA") { next(); }
      }
      first = false;

      // Se próximo é o delimitador de parada (vírgula dupla, etc.), ignore entradas vazias
      if (peek().kind === stopKind || peek().kind === "COMMA" || peek().kind === "EOF") {
        continue;
      }

      const item = parseItem();
      if (item) out.push(item);
    }

    return out;
  }

  function parseItem(): TreeNode | null {
    const t = peek();

    // Ellipsis como item
    if (isEllipsisName(t)) {
      next(); // consome ELLIPSIS
      return { name: "...", type: "file", ellipsis: true };
    }

    // Pasta com chave entre colchetes: [name] : { ... }
    if (t.kind === "LBRACK") {
      next();
      const n = next();
      if (n.kind !== "NAME") {
        errors.push(`Esperado nome de pasta dentro de '[]' em ${n.pos}`);
        // tentar sincronizar
        if (peek().kind === "RBRACK") next();
        // seguir adiante
        return null;
      }
      if (!expect("RBRACK", `Esperado ']' após nome de pasta em ${n.pos}`)) {
        // tentativa de prosseguir
      }
      const name = n.val!.trim();

      if (!expect("COLON", `Esperado ':' após '[${name}]'`)) return { name, type: "folder" };
      if (peek().kind !== "LBRACE") {
        errors.push(`Esperado '{' após '[${name}]:' em ${peek().pos}`);
        return { name, type: "folder" };
      }
      const children = parseGroup();
      return { name, type: "folder", ...(children.length ? { children } : {}) };
    }

    // Pasta sem colchetes: name : { ... }
    if (t.kind === "NAME") {
      // olhe adiante: pasta se depois houver ":" (não consome ainda a brace)
      const nameTok = next();
      const nameRaw = nameTok.val!.trim();
      const name = stripBrackets(nameRaw); // tolera "name" ou "[name]"

      if (peek().kind === "COLON") {
        next(); // consome ':'
        if (peek().kind !== "LBRACE") {
          errors.push(`Esperado '{' após '${name}:' em ${peek().pos}`);
          return { name, type: "folder" };
        }
        const children = parseGroup();
        return { name, type: "folder", ...(children.length ? { children } : {}) };
      }

      // Caso contrário, é arquivo
      return { name, type: "file" };
    }

    // Pasta vazia com sintaxe: name: {} (quando começou com '{' antes já estamos lá)
    if (t.kind === "LBRACE") {
      // bloco anônimo não é válido como item -> parse mesmo assim e descarta?
      const children = parseGroup();
      // opcional: gerar um nó especial? Melhor: erro + ignora
      errors.push(`Bloco '{}' não associado a uma chave em ${t.pos}`);
      if (children.length) {
        // se quiser, empurre os filhos ao nível atual:
        return { name: "(anon)", type: "folder", children };
      }
      return null;
    }

    // Qualquer outra coisa inesperada
    errors.push(`Token inesperado '${t.kind}' em ${t.pos}`);
    next(); // evita loop infinito
    return null;
  }

  const roots = parseDocument();
  return { roots, errors };
}
