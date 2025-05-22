import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AuthUser } from '../../../domain/entities/auth-user';

export class RegisterRequest {
  @IsNotEmpty()
  name: string;

  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  async toDto(): Promise<AuthUser> {
    const authUser = new AuthUser();
    authUser.name = this.name;
    authUser.username = this.username;
    authUser.email = this.email;
    authUser.passwordRaw = this.password;
    return authUser;
  }
}
