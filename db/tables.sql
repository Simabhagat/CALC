CREATE DATABASE APPSTORE;

use APPSTORE;

CREATE TABLE apps(
	app_id INT AUTO_INCREMENT PRIMARY KEY,
    app_name VARCHAR(255) NOT NULL,
    app_icon VARCHAR(255),
    app_description TEXT,
    INDEX indx_app_name (app_name)
);

CREATE TABLE users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_icon VARCHAR(255)
);

CREATE TABLE reviews(
	review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    app_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY(app_id) references apps(app_id),
    INDEX indx_user_id (user_id),
    INDEX indx_app_id (app_id)
);
    
CREATE TABLE downloads(
	download_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    app_id INT,
    download_tiemstamp DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (app_id) REFERENCES apps(app_id)
);

CREATE TABLE app_screenshots (
	app_screenshots_id INT AUTO_INCREMENT PRIMARY KEY,
    app_id INT,
    screenshots_url VARCHAR(255),
    FOREIGN KEY (app_id) REFERENCES apps(app_id)
);
