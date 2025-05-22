import { UserStatus } from 'src/modules/user/domain/value-objects/user-status';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  status: UserStatus;
  password: string;
  created: Date;
  modified: Date;
}
