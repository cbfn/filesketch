# 📂 Filesketch

Transforme **texto simples** em **árvores de pastas bonitas**, coloridas e exportáveis.  
Perfeito para PRs, documentações e apresentações técnicas.  

![preview](./public/preview.png) <!-- você pode atualizar com um screenshot gerado -->

---

## ✨ O que é?

O **Filesketch** é uma ferramenta online feita em **Next.js + TailwindCSS** que permite:

- Escrever uma mini-sintaxe de estrutura de pastas (inspirada em JSON).
- Visualizar instantaneamente como **árvore ASCII colorida**.
- Alternar temas prontos (Dracula, Monokai, Solarized…).
- Personalizar o **fundo da árvore**.
- Exportar como **PNG** ou copiar em **texto ASCII**.
- Mostrar/ocultar ícones de arquivos e pastas com ícones do [lucide-react](https://lucide.dev/).

---

## 🖥️ Demonstração

```txt
{
  src: {
    main.tsx,
    routes.tsx,
    components: {
      Header: { index.tsx, index.test.tsx },
      Footer: { index.tsx, index.test.tsx },
      ...
    },
    ...
  },
  public: {
    index.html,
    assets: { images: { ... } }
  },
  next.config.ts,
  README.md,
  ...
}
```

Renderiza em:

```
filesketch/
└─ src/
   ├─ main.tsx
   ├─ routes.tsx
   ├─ components/
   │  ├─ Header/
   │  │  ├─ index.tsx
   │  │  └─ index.test.tsx
   │  └─ Footer/
   │     ├─ index.tsx
   │     └─ index.test.tsx
   └─ ...
└─ public/
   ├─ index.html
   └─ assets/
      └─ images/
         └─ ...
└─ next.config.ts
└─ README.md
└─ ...
```

---

## 🚀 Tecnologias

- ⚡ [Next.js 14](https://nextjs.org/)  
- 🎨 [TailwindCSS](https://tailwindcss.com/)  
- 🖋️ [react-simple-code-editor](https://github.com/satya164/react-simple-code-editor) + [PrismJS](https://prismjs.com/)  
- 📦 [lucide-react](https://lucide.dev/) (ícones de arquivos e pastas)  
- 🖼️ [html-to-image](https://github.com/bubkoo/html-to-image) (exportar PNG)  

---

## 📦 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/cbfn/filesketch.git
cd filesketch

# 2. Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# 3. Rode o servidor de dev
npm run dev
```

Abra em [http://localhost:3000](http://localhost:3000).

---

## 📚 Documentação rápida da sintaxe

- **Pasta**: `nome: { ... }`  
- **Arquivo**: `nome.ext`  
- **Subpasta**: `{ pasta: { arquivo.ext } }`  
- **Reticências (`...`)**: representam conteúdo omitido no mesmo nível.  
- **Topo**: pode misturar **pastas e arquivos** lado a lado.  

---

## 🗺️ Roadmap

- [x] Exportar árvore como PNG  
- [x] Suporte a temas de cor + fundo customizável  
- [x] Ícones opcionais de arquivos/pastas  
- [ ] Modo visual em **cards**  
- [ ] Compartilhar árvore por link curto  
- [ ] Editor com auto-complete para a sintaxe  

---

## 🤝 Como contribuir

Quer ajudar a melhorar o **Filesketch**?  
Siga os passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature/bugfix:  
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas mudanças:  
   ```bash
   git commit -m "Adiciona nova feature"
   ```
4. Envie sua branch:  
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request 🎉

---

## 📜 Licença

Este projeto é open-source sob a licença [MIT](LICENSE).

---

### 💡 Ideia e desenvolvimento por [@seu-usuario](https://github.com/seu-usuario)
