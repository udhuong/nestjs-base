import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginAction {
  async handle(email: string, password: string) {
    console.log(email, password);
  }
}
