import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/modules/user/domain/entities/user';

export class CreateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  async toEntity(): Promise<User> {
    const user = new User();
    user.name = this.name;
    user.username = this.username;
    user.email = this.email;
    user.password = await bcrypt.hash(this.password, 10);
    return user;
  }
}
