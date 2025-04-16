import { IsEmail, IsNotEmpty } from 'class-validator';
import { AuthUser } from '../../../domain/entities/auth-user';
import * as bcrypt from 'bcryptjs';

export class RegisterRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  async toDto(): Promise<AuthUser> {
    const hashed = await bcrypt.hash(this.password, 10);
    const authUser = new AuthUser();
    authUser.name = this.name;
    authUser.email = this.email;
    authUser.password = hashed;
    return authUser;
  }
}
