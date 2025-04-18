create table oauth_access_tokens
(
    `id`         varchar(100) primary key,
    `user_id`    int unsigned default 0                 not null comment 'họ tên người dùng',
    `revoked`    boolean      default 0                 not null comment 'token đã bị vô hiệu hóa chưa',
    `expires_at` datetime     default current_timestamp not null comment 'thời gian sống của token',
    `created`    datetime     default current_timestamp not null,
    `modified`   datetime     default current_timestamp not null on update current_timestamp,
    index idx_user_id (`user_id`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci comment 'Token truy cập';
