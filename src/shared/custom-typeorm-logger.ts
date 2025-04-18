/* eslint-disable @typescript-eslint/no-unused-vars */

import chalk from 'chalk';
import { highlight } from 'cli-highlight';
import * as dotenv from 'dotenv';
import { Logger, QueryRunner } from 'typeorm';
import * as winston from 'winston';

const fileLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} [${info.level}] ${info.message}`),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/query.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

dotenv.config();
const enableConsoleLog = process.env.TYPEORM_CONSOLE_LOG === 'true';

export class CustomTypeORMLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const formatted = this.formatSql(query, parameters);
    const logText = `[QUERY]\n${formatted}`;
    if (enableConsoleLog) {
      console.log(chalk.greenBright('🟢 [QUERY] ') + formatted);
    }
    fileLogger.info(logText);
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const formatted = this.formatSql(query, parameters);
    const errorMsg = typeof error === 'string' ? error : error.message;
    if (enableConsoleLog) {
      console.error(chalk.redBright('❌ [QUERY ERROR]'), errorMsg);
      console.error(chalk.redBright('📄 [QUERY]') + '\n' + formatted);
    }
    fileLogger.error(`[ERROR] ${errorMsg}\n${formatted}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const formatted = this.formatSql(query, parameters);
    if (enableConsoleLog) {
      console.warn(chalk.yellowBright(`🐢 [SLOW QUERY > ${time}ms]`));
      console.warn(formatted);
    }
    fileLogger.info(`[SLOW QUERY > ${time}ms]\n${formatted}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (enableConsoleLog) {
      console.log(chalk.cyanBright('🏗️ [SCHEMA BUILD]'), message);
    }
    fileLogger.info(`[SCHEMA BUILD] ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    if (enableConsoleLog) {
      console.log(chalk.magentaBright('🧬 [MIGRATION]'), message);
    }
    fileLogger.info(`[MIGRATION] ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    const text = `[${level.toUpperCase()}] ${message}`;
    if (enableConsoleLog) {
      if (level === 'log') console.log(chalk.whiteBright('📘 [LOG]'), message);
      if (level === 'info') console.info(chalk.blueBright('ℹ️ [INFO]'), message);
      if (level === 'warn') console.warn(chalk.yellow('⚠️ [WARN]'), message);
    }
    fileLogger.info(text);
  }

  private formatSql(query: string, parameters?: any[]): string {
    const fullQuery = this.bindParameters(query, parameters);
    return highlight(fullQuery, {
      language: 'sql',
      ignoreIllegals: true,
      theme: {
        keyword: chalk.cyanBright,
        string: chalk.yellowBright,
        literal: chalk.greenBright,
        number: chalk.magentaBright,
      },
    });
  }

  private bindParameters(query: string, parameters?: any[]): string {
    if (!parameters || !parameters.length) return query;
    let i = 0;
    return query.replace(/\?/g, () => {
      const param = parameters[i++];
      if (typeof param === 'string') return `'${param}'`;
      if (param instanceof Date) return `'${param.toISOString()}'`;
      if (param === null || param === undefined) return 'NULL';
      return param.toString();
    });
  }
}
