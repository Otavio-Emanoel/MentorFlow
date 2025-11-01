export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const PREFIX = 'MentorFlow';

export function log(level: LogLevel, ...args: unknown[]) {
  const ts = new Date().toISOString();
  // eslint-disable-next-line no-console
  console[level](`[${PREFIX}] [${ts}]`, ...args);
}

export const logger = {
  debug: (...a: unknown[]) => log('debug', ...a),
  info: (...a: unknown[]) => log('info', ...a),
  warn: (...a: unknown[]) => log('warn', ...a),
  error: (...a: unknown[]) => log('error', ...a),
};
