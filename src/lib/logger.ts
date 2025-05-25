import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    ({ timestamp, level, message }) =>
      `[${timestamp}] [${level.toUpperCase()}]: ${message}`
  )
);

const dailyRotateFileTransport = new transports.DailyRotateFile({
  dirname: logDir,
  filename: `%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
});

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [dailyRotateFileTransport],
});

export default logger;
