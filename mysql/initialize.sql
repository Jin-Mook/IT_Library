-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/fhD2sm
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

create database if not exists It_library;

-- 책 소개
CREATE TABLE `Books` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `book_title` VARCHAR(255)  NOT NULL ,
    `book_image` VARCHAR(255)  NOT NULL ,
    `book_writer` VARCHAR(255)  NULL ,
    `book_publisher` VARCHAR(255)  NULL ,
    `book_publish_date` date  NULL ,
    `book_category` int  NOT NULL ,
    `book_info` text  NULL ,
    `book_rating` float  NOT NULL DEFAULT 0,
    `book_like_count` int  NOT NULL DEFAULT 0,
    `comments_count` int  NOT NULL DEFAULT 0,
    PRIMARY KEY (
        `id`
    )
);

-- 책 상세페이지 리뷰
CREATE TABLE `Book_comments` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `book_id` int  NOT NULL ,
    `user_id` int  NOT NULL ,
    `comment_title` text  NOT NULL ,
    `comment_rating` int  NOT NULL ,
    `comment_date` datetime  NOT NULL ,
    `comment_context` text  NULL ,
    `created_at` datetime  NOT NULL ,
    `updated_at` datetime  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

-- 유저
CREATE TABLE `Users` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `nickname` VARCHAR(255)  NOT NULL ,
    `email` VARCHAR(255)  NOT NULL ,
    `password` text  NOT NULL ,
    `social` VARCHAR(255)  NOT NULL DEFAULT 'local',
    `email_check` BOOLEAN DEFAULT false,
    PRIMARY KEY (
        `id`
    )
);

-- 찜하기
CREATE TABLE `Users_And_Books` (
    `book_id` int  NOT NULL ,
    `user_id` int  NOT NULL ,
    PRIMARY KEY (
        `book_id`, `user_id`
    )
);

CREATE TABLE `Book_categories` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `category` VARCHAR(255)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `Book_reviews` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `book_title` VARCHAR(255)  NOT NULL ,
    `book_image` VARCHAR(255)  NOT NULL ,
    `book_writer` VARCHAR(255)  NOT NULL ,
    `book_publisher` VARCHAR(255)  NOT NULL ,
    `review_rating` int  NOT NULL DEFAULT 0,
    `book_recommend` VARCHAR(255)  NOT NULL ,
    `review_recommend_count` int  NOT NULL DEFAULT 0,
    `view_track` int  NOT NULL DEFAULT 0,
    `context` text  NOT NULL ,
    `created_at` datetime  NOT NULL ,
    `updated_at` datetime  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `Review_comments` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `book_review_id` int  NOT NULL ,
    `user_id` int  NOT NULL ,
    `parent_comment_id` int  NOT NULL ,
    `comment` text  NOT NULL ,
    `depth` int  NOT NULL DEFAULT 0,
    `created_at` datetime  NOT NULL ,
    `updated_at` datetime  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `Chat_rooms` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `public` boolean  NOT NULL DEFAULT 1,
    `password` VARCHAR(255)  NULL ,
    `chat_title` VARCHAR(255)  NOT NULL ,
    `chat_topic` VARCHAR(255)  NOT NULL ,
    `total_person` int  NOT NULL ,
    `created_at` datetime  NOT NULL ,
    `updated_at` datetime  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `Chat_messages` (
    `id` int AUTO_INCREMENT NOT NULL ,
    `image` boolean  NOT NULL DEFAULT 0,
    `chat_room_id` int  NOT NULL ,
    `user_id` int  NOT NULL ,
    `message` text  NOT NULL ,
    `created_at` datetime  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

ALTER TABLE `Books` ADD CONSTRAINT `fk_Books_book_category` FOREIGN KEY(`book_category`)
REFERENCES `Book_categories` (`id`);

ALTER TABLE `Book_comments` ADD CONSTRAINT `fk_Book_comments_book_id` FOREIGN KEY(`book_id`)
REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Book_comments` ADD CONSTRAINT `fk_Book_comments_user_id` FOREIGN KEY(`user_id`)
REFERENCES `Users` (`id`);

ALTER TABLE `Users_And_Books` ADD CONSTRAINT `fk_Users_And_Books_book_id` FOREIGN KEY(`book_id`)
REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Users_And_Books` ADD CONSTRAINT `fk_Users_And_Books_user_id` FOREIGN KEY(`user_id`)
REFERENCES `Users` (`id`);

ALTER TABLE `Review_comments` ADD CONSTRAINT `fk_Review_comments_book_review_id` FOREIGN KEY(`book_review_id`)
REFERENCES `Book_reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Review_comments` ADD CONSTRAINT `fk_Review_comments_user_id` FOREIGN KEY(`user_id`)
REFERENCES `Users` (`id`);

ALTER TABLE `Review_comments` ADD CONSTRAINT `fk_Review_comments_parent_comment_id` FOREIGN KEY(`parent_comment_id`)
REFERENCES `Review_comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Chat_messages` ADD CONSTRAINT `fk_Chat_messages_chat_room_id` FOREIGN KEY(`chat_room_id`)
REFERENCES `Chat_rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Chat_messages` ADD CONSTRAINT `fk_Chat_messages_user_id` FOREIGN KEY(`user_id`)
REFERENCES `Users` (`id`);

load data infile '/var/lib/mysql_files/category.csv' into table Book_categories fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 rows;

load data infile '/var/lib/mysql_files/final_data.csv' into table Books fields terminated by ',' enclosed by '"' lines terminated by '\n' ignore 1 rows (@id, @title, @image, @writer, @publisher, @date, book_category, @info, @rating, @count, @comment) set book_writer = nullif(@writer, ''), book_publisher = nullif(@publisher, ''), book_publish_date = nullif(@date, ''), book_info = nullif(@info, '');