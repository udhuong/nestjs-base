import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('access_tokens')
export class AccessTokenEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  revoked: boolean = false;

  @Column({ type: 'datetime', name: 'expires_at' })
  expiresAt: Date;

  @Column({ type: 'datetime' })
  created: Date = new Date();

  @Column({ type: 'datetime' })
  modified: Date = new Date();
}
