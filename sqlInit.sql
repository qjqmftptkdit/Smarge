-- usage : mysql> source ./sqlInit.sql
CREATE DATABASE smarge;
USE smarge;

CREATE TABLE accounts (
user_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
user_name varchar(20) NOT NULL,
user_email varchar(255) NOT NULL,
user_password varchar(20) NOT NULL,
user_availabe boolean NOT NULL DEFAULT 0,
PRIMARY KEY(user_id)
);