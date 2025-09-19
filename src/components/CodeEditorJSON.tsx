"use client";

import { useId } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import type { EditorTheme } from "@/lib/themeBridge";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  theme: EditorTheme;             // ⟵ novo
};

export default function CodeEditorJSON({
  value,
  onChange,
  placeholder,
  className = "",
  theme,
}: Props) {
  const uid = useId(); // escopo do CSS dos tokens

  return (
    <div
      id={`editor-scope-${uid}`}
      className={`h-full min-h-[12rem] overflow-hidden rounded-xl border border-border shadow-inner ${className}`}
      style={{
        minHeight: 0,
        background: theme.background,
        color: theme.foreground,
        caretColor: theme.foreground,
      }}
    >
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={(code) => Prism.highlight(code, Prism.languages.json, "json")}
        padding={12}
        textareaClassName="outline-none"
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: 13,
          lineHeight: "1.55",
          background: "transparent",
          color: "inherit",
          height: "100%",
          overflow: "auto",
          whiteSpace: "pre",
          tabSize: 2 as unknown as number,
        }}
        onKeyDown={(e) => {
          const ta = e.target as HTMLTextAreaElement;
          if (e.key === "Tab") {
            e.preventDefault();
            const start = ta.selectionStart ?? 0;
            const end = ta.selectionEnd ?? 0;
            if (e.shiftKey) {
              const before = value.slice(0, start);
              const m = before.match(/ {1,2}$/);
              if (m) {
                const rm = m[0].length;
                const next = before.slice(0, -rm) + value.slice(end);
                onChange(next);
                requestAnimationFrame(() => {
                  ta.selectionStart = ta.selectionEnd = start - rm;
                });
              }
              return;
            }
            const insert = "  ";
            const next = value.slice(0, start) + insert + value.slice(end);
            onChange(next);
            requestAnimationFrame(() => {
              ta.selectionStart = ta.selectionEnd = start + insert.length;
            });
          }
        }}
        placeholder={placeholder}
      />

      {/* Tokens Prism escopados ao editor */}
      <style>{`
        #editor-scope-${uid} .token.property    { color: ${theme.tokens.property}; }
        #editor-scope-${uid} .token.string      { color: ${theme.tokens.string}; }
        #editor-scope-${uid} .token.number      { color: ${theme.tokens.number}; }
        #editor-scope-${uid} .token.boolean     { color: ${theme.tokens.boolean}; }
        #editor-scope-${uid} .token.null        { color: ${theme.tokens.null}; }
        #editor-scope-${uid} .token.punctuation { color: ${theme.tokens.punctuation ?? "inherit"}; opacity: .85; }
      `}</style>
    </div>
  );
}
