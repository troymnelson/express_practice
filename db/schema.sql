DROP DATABASE IF EXISTS express_practice;

CREATE DATABASE express_practice;

USE express_practice;

CREATE TABLE todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    words VARCHAR(250),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO todos (words) VALUES ('first todo'), ('second todo');


-- SELECT *
-- FROM todos;

-- SELECT *
-- FROM todos
-- WHERE id = 2;