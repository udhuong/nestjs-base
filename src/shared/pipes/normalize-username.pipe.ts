import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NormalizeUsernamePipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value.username === 'string') {
      value.username = value.username.trim().toLowerCase();
    }
    return value;
  }
}
