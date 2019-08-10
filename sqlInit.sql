-- usage : mysql> source ./sqlInit.sql
CREATE DATABASE smarge;
USE smarge;

CREATE TABLE accounts (
user_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
user_name varchar(20) NOT NULL,
user_email varchar(255) NOT NULL,
user_password varchar(255) NOT NULL,
user_salt varchar(50) NOT NULL,
user_checkCode varchar(50) NOT NULL,
user_available boolean NOT NULL DEFAULT 0,
PRIMARY KEY(user_id)
);

CREATE TABLE imageInfo(
image_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
user_name varchar(20) NOT NULL,
image_fileName varchar(255) NOT NULL,
image_name varchar(30) NOT NULL,
image_dec varchar(255) NOT NULL,
image_share boolean NOT NULL DEFAULT 0,
image_like bigint(20) unsigned NOT NULL DEFAULT 0,
image_dislike bigint(20) unsigned NOT NULL DEFAULT 0,
PRIMARY KEY(image_id)
);