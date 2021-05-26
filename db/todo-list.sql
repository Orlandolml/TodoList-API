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

CREATE TABLE todos(
    id INTEGER NOT NULL AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    iv VARCHAR(255) NOT NULL,
    userId INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES  users (id)
);
/*
   * Todo status
   * status 1 = uncompleted,
   * status 2 = deleted
*/

CREATE TABLE scheduledTask(
    id INTEGER NOT NULL AUTO_INCREMENT,
    status INTEGER DEFAULT 1,
    userId INTEGER NOT NULL,
    iv VARCHAR(255) NOT NULL,
    task VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    finishedAt TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users (id)
)
