import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as archiver from 'archiver';

@Injectable()
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;
  private readonly logsDir = path.join(process.cwd(), 'logs');

  constructor() {
    this.ensureLogsDir();
    this.initializeWinston();
  }

  private ensureLogsDir() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirpSync(this.logsDir);
    }
  }

  private initializeWinston() {
    const fileTransport = new winston.transports.DailyRotateFile({
      filename: path.join(this.logsDir, 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD-HH-mm', // Smaller interval for testing rotation if needed, otherwise use 'YYYY-MM-DD'
      zippedArchive: false, // We'll handle zipping manually to keep exactly 3 files
      maxSize: '20m',
      maxFiles: '14d', // Keep history, but we'll zip old ones
    });

    fileTransport.on('rotate', () => {
      this.handleLogRotation();
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
        fileTransport,
      ],
    });
  }

  private async handleLogRotation() {
    try {
      const files = await fs.readdir(this.logsDir);
      const logFiles = files
        .filter(f => f.endsWith('.log'))
        .map(f => ({
          name: f,
          path: path.join(this.logsDir, f),
          mtime: fs.statSync(path.join(this.logsDir, f)).mtime.getTime(),
        }))
        .sort((a, b) => b.mtime - a.mtime);

      if (logFiles.length > 3) {
        const filesToArchive = logFiles.slice(3);
        for (const file of filesToArchive) {
          await this.archiveFile(file.path);
        }
      }
    } catch (error) {
      console.error('Failed to handle log rotation:', error);
    }
  }

  private async archiveFile(filePath: string) {
    const fileName = path.basename(filePath);
    const zipPath = path.join(this.logsDir, `${fileName}.zip`);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    return new Promise<void>((resolve, reject) => {
      output.on('close', async () => {
        await fs.remove(filePath);
        resolve();
      });
      archive.on('error', (err) => reject(err));
      archive.pipe(output);
      archive.file(filePath, { name: fileName });
      archive.finalize();
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, ...optionalParams);
  }
}
