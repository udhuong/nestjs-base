create table users
(
    `id`       int unsigned auto_increment primary key,
    `name`     varchar(100) default ''                not null comment 'họ tên người dùng',
    `username` varchar(50)  default ''                not null comment 'username người dùng',
    `email`    varchar(100) default ''                not null comment 'email tên người dùng',
    `phone`    varchar(20)  default ''                not null comment 'số điện thoại người dùng',
    `password` varchar(255) default ''                not null comment 'mật khẩu',
    `status`   tinyint      default 0                 not null comment 'trạng thái: 0: mặc định, 1: mới gia nhập, 2: đã kích hoạt, 3: tạm khóa',
    `created`  datetime     default current_timestamp not null,
    `modified` datetime     default current_timestamp not null on update current_timestamp,
    unique unk_username (`username`),
    unique unk_email (`email`),
    unique unk_phone (`phone`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci comment 'Bảng dữ liệu người dùng';
