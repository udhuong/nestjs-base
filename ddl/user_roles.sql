create table user_roles
(
    `role_id` int unsigned not null comment 'id bảng roles',
    `user_id` int unsigned not null comment 'id bảng users',
    primary key (`user_id`, `role_id`),
    foreign key (`role_id`) references roles (`id`) on delete cascade
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci comment 'User được gán role nào';
