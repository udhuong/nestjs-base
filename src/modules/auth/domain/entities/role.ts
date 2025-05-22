import { Permission } from './permission';

export class Role {
  private _id: number;
  private _name: string;
  private _permissions: Permission[];

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get permissions(): Permission[] {
    return this._permissions;
  }

  set permissions(value: Permission[]) {
    this._permissions = value;
  }
}
