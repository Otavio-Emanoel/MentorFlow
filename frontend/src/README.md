# Estrutura inicial (frontend/src)

Esta estrutura organiza a base do app React Native (Expo) sem alterar o ponto de entrada atual (`App.tsx`). Você pode migrar o código gradualmente para `src/`.

Pastas principais:
- components: Componentes reutilizáveis (botões, inputs, cards, etc.).
- screens: Telas do app (Home, Login, Dashboard…).
- navigation: Navegação do app (stacks, tabs, etc.).
- services/api: Acesso à API e clients HTTP.
- store: Estado global (Context API, Zustand, Redux, etc.).
- hooks: Hooks customizados.
- utils: Funções utilitárias (formatters, logger…).
- theme: Tokens de design (cores, espaçamentos, tipografia…).
- types: Tipos TypeScript compartilhados.
- context: Providers e contextos específicos (ex.: AuthContext).
- config: Configurações (ex.: API_URL, flags de ambiente).
- constants: Constantes (ex.: rotas, chaves de storage).
- i18n: Internacionalização.
- lib: Integrações e bibliotecas isoladas.

Como adotar gradualmente:
1. Mantenha `App.tsx` intacto por enquanto.
2. Crie as telas em `src/screens` e importe em `App.tsx`.
3. Quando decidir usar um sistema de navegação, mova o conteúdo de `App.tsx` para `src/navigation/AppNavigator.tsx` e importe o Navigator no `App.tsx`.
4. Configure aliases (opcional) depois: `@/* -> src/*` (exige ajuste no Babel/Metro além do tsconfig).
