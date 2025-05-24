import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export class MongodbConfig {
  constructor(private readonly configService: ConfigService) {}

  get dbDefault(): MongooseModuleFactoryOptions {
    return this.configService.get('database.mongodb');
  }
}
