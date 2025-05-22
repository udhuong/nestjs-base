export enum Permission {
  USER_CREATE  = 'user_create',
  USER_VIEW    = 'user_view',
  USER_UPDATE  = 'user_update',
  USER_DELETE  = 'user_delete',
  USER_ASSIGN  = 'user_assign',
  POST_CREATE  = 'post_create',
  POST_VIEW    = 'post_view',
  POST_UPDATE  = 'post_update',
  POST_DELETE  = 'post_delete',
  POST_PUBLISH = 'post_publish',
}

export const PermissionLabelMap: Record<Permission, string> = {
  [Permission.USER_CREATE]: 'Tạo người dùng mới',
  [Permission.USER_VIEW]: 'Xem danh sách người dùng',
  [Permission.USER_UPDATE]: 'Cập nhật thông tin người dùng',
  [Permission.USER_DELETE]: 'Xoá người dùng',
  [Permission.USER_ASSIGN]: 'Gán vai trò cho người dùng',
  [Permission.POST_CREATE]: 'Tạo bài viết mới',
  [Permission.POST_VIEW]: 'Xem bài viết',
  [Permission.POST_UPDATE]: 'Chỉnh sửa bài viết',
  [Permission.POST_DELETE]: 'Xoá bài viết',
  [Permission.POST_PUBLISH]: 'Xuất bản bài viết',
};
