CREATE TABLE user_db.users (
	user_id INT AUTO_INCREMENT NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);