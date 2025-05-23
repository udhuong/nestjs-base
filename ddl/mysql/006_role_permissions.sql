create table role_permissions
(
    `permission_id` int unsigned not null comment 'id bảng permissions',
    `role_id`       int unsigned not null comment 'id bảng roles',
    primary key (`role_id`, `permission_id`),
    foreign key (`permission_id`) references permissions (`id`) on delete cascade,
    foreign key (`role_id`) references roles (`id`) on delete cascade
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci comment 'Quan hệ giữa roles và permissions';