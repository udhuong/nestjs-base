DROP DATABASE IF EXISTS mydb;
CREATE DATABASE mydb
    WITH
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'vi_VN.utf8'
    LC_CTYPE = 'vi_VN.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
