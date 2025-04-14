import { Controller, Get, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/')
  async getListUser(@Query('username') username: string): Promise<any> {
    console.log(username);
  }
}
