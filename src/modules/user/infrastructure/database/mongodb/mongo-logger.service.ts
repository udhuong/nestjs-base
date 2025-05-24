import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CONNECTION } from 'src/modules/user/user-type';

@Injectable()
export class MongoLoggerService implements OnModuleInit {
  private readonly logger = new Logger(MongoLoggerService.name);

  constructor(
    // @InjectConnection() private readonly defaultConn: Connection,
    @InjectConnection(CONNECTION.MONGODB) private readonly secondary: Connection,
  ) {}

  onModuleInit() {
    // this.bindEvents(this.defaultConn, 'default');
    this.bindEvents(this.secondary, CONNECTION.MONGODB);
  }

  private bindEvents(conn: Connection, name: string) {
    if (conn.readyState === 1) {
      console.log(`✅ MongoDB connection "${name}" is already connected`);
    }
    conn.on('connected', () => console.log(`✅ MongoDB connection "${name}" connected`));
    conn.on('error', err => console.error(`❌ MongoDB connection "${name}" error:`, err));
    conn.on('disconnected', () => console.warn(`⚠️ MongoDB connection "${name}" disconnected`));
    conn.on('reconnected', () => console.log(`🔄 MongoDB connection "${name}" reconnected`));
  }
}
