create table oauth_refresh_tokens
(
    `id`              varchar(100) primary key,
    `access_token_id` varchar(100) default ''                not null comment 'chuỗi token id bảng oauth_access_tokens',
    `revoked`         boolean      default 0                 not null comment 'token đã bị vô hiệu hóa chưa',
    `expires_at`      datetime     default current_timestamp not null comment 'thời gian sống của token',
    index idx_access_token_id (`access_token_id`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci comment 'Refresh token';
