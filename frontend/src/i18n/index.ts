// Placeholder de i18n simples. Substitua por i18next ou expo-localization quando necessário.
export function t(key: string, params?: Record<string, unknown>) {
  if (!params) return key;
  return Object.keys(params).reduce((acc, k) => acc.replace(`{{${k}}}`, String(params[k])), key);
}
