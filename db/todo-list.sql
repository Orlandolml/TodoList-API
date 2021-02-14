DROP DATABASE IF EXISTS todo_list_app;

CREATE DATABASE todo_list_app;

USE todo_list_app;

CREATE TABLE users(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    email VARCHAR(50) NOT NULL,
    password VARCHAR(72) NOT NULL,
    UNIQUE(email),
    PRIMARY KEY (id)
);

/*
   * Todo status
   * status 1 = uncompleted,
   * status 2 = completed,
   * status 3 = deleted
*/

CREATE TABLE todos(
    id INTEGER NOT NULL AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    finishedAt TIMESTAMP,
    status TINYINT NOT NULL DEFAULT 1,
    userId INTEGER NOT  NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES  users (id)
);
