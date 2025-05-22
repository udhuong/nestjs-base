export enum Role {
  ADMIN     = 'admin',
  MODERATOR = 'moderator',
  EDITOR    = 'editor',
  USER      = 'user',
}

export const RoleLabelMap: Record<Role, string> = {
  [Role.ADMIN]: 'Quản trị viên',
  [Role.MODERATOR]: 'Quản lý',
  [Role.EDITOR]: 'Người soạn thảo',
  [Role.USER]: 'Người dùng thường',
};
