import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  @Column({ name: 'guard_name' })
  guardName: string;

  created: Date;
  modified: Date;
}
