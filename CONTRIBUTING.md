# 🤝 Contribuindo com o Filesketch

Obrigado pelo interesse em contribuir com o **Filesketch**!  
Queremos manter este projeto aberto, colaborativo e fácil de evoluir.  

---

## 🚀 Como começar

1. **Fork** o repositório
2. Crie sua branch para a mudança desejada:  
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commits claros e descritivos
4. Envie sua branch:  
   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request** 🎉

---

## 📝 Convenções de código

- Use **TypeScript** sempre que possível.
- Mantenha a organização das pastas:  
  ```
  src/
   ├─ app/         # páginas Next.js
   ├─ components/  # componentes React
   ├─ lib/         # parsers, helpers, utilitários
   └─ styles/      # estilos globais
  ```
- Prefira **componentes funcionais** e **React Hooks**.
- Use **TailwindCSS** para estilos.
- Ícones devem vir do [lucide-react](https://lucide.dev/).

---

## 💬 Commits

Siga uma convenção clara no commit message:

- `feat:` nova funcionalidade  
- `fix:` correção de bug  
- `docs:` documentação  
- `style:` ajustes visuais (CSS/Tailwind)  
- `refactor:` refatoração sem mudança de comportamento  
- `test:` testes  

Exemplo:
```bash
git commit -m "feat(editor): adiciona suporte a highlight de JSON"
```

---

## 🔎 Code Review

- Pull Requests devem ser pequenos e focados em um objetivo.
- Descreva o que foi feito e como testar.
- Sempre que possível, inclua **screenshots** ou **gifs** da mudança.

---

## 🛠️ Como rodar localmente

```bash
git clone https://github.com/seu-usuario/filesketch.git
cd filesketch
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

---

## 🌟 Como ajudar

- Melhorando o parser da DSL
- Criando novos temas de cores
- Otimizando o editor de código
- Escrevendo testes (unitários ou E2E)
- Melhorando a documentação
- Reportando bugs ou sugerindo novas ideias

---

## 📜 Licença

Este projeto segue a licença [MIT](LICENSE).  
Ao contribuir, você concorda que seu código será incorporado sob esta licença.

---

💡 Dúvidas ou ideias? Abra uma **Issue** e vamos conversar!  
