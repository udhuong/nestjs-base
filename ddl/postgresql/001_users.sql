CREATE TABLE users (
    id serial primary key,
    name varchar(100) default '' not null,
    username varchar(50) default '' not null,
    email varchar(100) not null,
    phone varchar(20) default '' not null,
    password varchar(255) default '' not null,
    status smallint default 0 not null,
    created timestamp default current_timestamp not null,
    modified timestamp default current_timestamp not null,

    CONSTRAINT unk_email UNIQUE (email)
);

CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_phone ON users(phone);

COMMENT ON TABLE users IS 'Bảng dữ liệu người dùng';
COMMENT ON COLUMN users.name IS 'họ tên người dùng';
COMMENT ON COLUMN users.username IS 'username người dùng';
COMMENT ON COLUMN users.email IS 'email người dùng';
COMMENT ON COLUMN users.phone IS 'số điện thoại người dùng';
COMMENT ON COLUMN users.password IS 'mật khẩu';
COMMENT ON COLUMN users.status IS 'trạng thái: 0: mặc định, 1: mới gia nhập, 2: đã kích hoạt, 3: tạm khóa';
