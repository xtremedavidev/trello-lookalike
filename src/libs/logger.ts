const log = (
  level: "info" | "warn" | "error",
  message: string,
  ...args: any[]
) => {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, ...args);
};

export const logger = {
  info: (message: string, ...args: any[]) => log("info", message, ...args),
  warn: (message: string, ...args: any[]) => log("warn", message, ...args),
  error: (message: string, ...args: any[]) => log("error", message, ...args),
};
