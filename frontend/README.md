# MentorFlow – Frontend (Expo)

Estrutura preparada para escalar o app com React Native + TypeScript, mantendo o `App.tsx` atual intacto.

## Pastas

- src/components: componentes reutilizáveis (ex.: `ui/PrimaryButton`)
- src/screens: telas do app (ex.: `HomeScreen`)
- src/navigation: ponto de navegação (ex.: `AppNavigator` – stub)
- src/services/api: client HTTP simples
- src/store: estado global com Context API (stub)
- src/hooks: hooks customizados (ex.: `useToggle`)
- src/utils: utilitários (ex.: `logger`)
- src/theme: tokens de design (cores, espaçamentos)
- src/types: tipos TS compartilhados
- src/context: contexts (ex.: `AuthContext`)
- src/config: configurações (ex.: `Config.API_URL`)
- src/constants: constantes (ex.: `ROUTES`)
- src/i18n: placeholder de i18n
- src/lib: integrações (analytics, Sentry…)

## Próximos passos sugeridos

- Comece criando telas em `src/screens` e importe-as no `App.tsx`.
- Quando adicionar React Navigation, substitua `src/navigation/AppNavigator` e use-o dentro do `App.tsx`.
- Para aliases (opcional): configure Babel/Metro para `@/* -> src/*`. Deixe que eu configure quando quiser.
- Configure variáveis de ambiente com `EXPO_PUBLIC_API_URL` para o client HTTP.
