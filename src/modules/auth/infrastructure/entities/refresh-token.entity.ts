import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'access_token_id' })
  accessTokenId: string;

  @Column()
  revoked: boolean = false;

  @Column({ type: 'datetime', name: 'expires_at' })
  expiresAt: Date = new Date();
}
