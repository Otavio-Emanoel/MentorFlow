export const ROUTES = {
  HOME: 'Home',
  LOGIN: 'Login',
  DASHBOARD: 'Dashboard',
} as const;
export type RouteName = typeof ROUTES[keyof typeof ROUTES];
