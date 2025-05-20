/* eslint-disable */

import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from 'src/shared/services/http.service';

@Injectable()
export class UserService {
  constructor(@Inject('USER_HTTP_SERVICE') private readonly httpService: HttpService) {}

  async getUserProfile() {
    const res = await this.httpService.get('/profile');
    return res.data;
  }
}
