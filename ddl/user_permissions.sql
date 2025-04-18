create table user_permissions
(
    `permission_id` int unsigned not null comment 'id bảng permissions',
    `user_id`       int unsigned not null comment 'id bảng users',
    primary key (`user_id`, `permission_id`),
    foreign key (`permission_id`) references permissions (`id`) on delete cascade
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci comment 'User có permission riêng';
