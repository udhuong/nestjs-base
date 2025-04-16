create table roles
(
    `id`         int unsigned auto_increment primary key,
    `name`       varchar(255)                       not null,
    `guard_name` varchar(255)                       not null,
    `created`    datetime default current_timestamp not null,
    `modified`   datetime default current_timestamp not null on update current_timestamp,
    unique key roles_name_guard_unique (name, guard_name)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci comment 'Bảng lưu role';
