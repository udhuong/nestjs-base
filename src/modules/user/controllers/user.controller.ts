import { Controller, Get, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}

  /**
   * Lấy thông tin người dùng theo username
   * @param username
   */
  @Get('get-by-username')
  async getByUser(@Query('username') username: string): Promise<any> {
    console.log(username);
  }
}
