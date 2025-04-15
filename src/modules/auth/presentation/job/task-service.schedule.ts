import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('5 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 5');
  }

  @Cron(CronExpression.EVERY_5_SECONDS, {})
  handleCron2() {
    this.logger.debug('Called when the current second is 5');
  }
}
