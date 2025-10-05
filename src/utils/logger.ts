type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  userId?: string;
  ip?: string;
}

class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLog(level: LogLevel, message: string, data?: any, userId?: string, ip?: string): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userId,
      ip
    };
  }

  info(message: string, data?: any, userId?: string, ip?: string) {
    const log = this.formatLog('info', message, data, userId, ip);
    console.log(`[INFO] ${log.timestamp} - ${message}`, data || '');
    
    // Em produção, enviar para serviço de logging
    this.persistLog(log);
  }

  warn(message: string, data?: any, userId?: string, ip?: string) {
    const log = this.formatLog('warn', message, data, userId, ip);
    console.warn(`[WARN] ${log.timestamp} - ${message}`, data || '');
    this.persistLog(log);
  }

  error(message: string, error?: Error, userId?: string, ip?: string) {
    const log = this.formatLog('error', message, {
      error: error?.message,
      stack: error?.stack
    }, userId, ip);
    console.error(`[ERROR] ${log.timestamp} - ${message}`, error);
    this.persistLog(log);
  }

  debug(message: string, data?: any, userId?: string, ip?: string) {
    if (process.env.NODE_ENV === 'development') {
      const log = this.formatLog('debug', message, data, userId, ip);
      console.debug(`[DEBUG] ${log.timestamp} - ${message}`, data || '');
    }
  }

  private persistLog(log: LogEntry) {
    // Em produção, implementar persistência real
    // Ex: Enviar para CloudWatch, Datadog, etc.
  }
}

export default Logger.getInstance();