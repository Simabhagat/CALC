/*
  Warnings:

  - You are about to drop the `app` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appscreenshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `download` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `appscreenshot` DROP FOREIGN KEY `AppScreenshot_app_id_fkey`;

-- DropForeignKey
ALTER TABLE `download` DROP FOREIGN KEY `Download_app_id_fkey`;

-- DropForeignKey
ALTER TABLE `download` DROP FOREIGN KEY `Download_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_app_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_user_id_fkey`;

-- DropTable
DROP TABLE `app`;

-- DropTable
DROP TABLE `appscreenshot`;

-- DropTable
DROP TABLE `download`;

-- DropTable
DROP TABLE `review`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `apps` (
    `app_id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_name` VARCHAR(255) NOT NULL,
    `app_icon` VARCHAR(255) NULL,
    `app_description` TEXT NULL,
    `apk_url` VARCHAR(255) NULL,
    `apk_size` BIGINT NULL,

    INDEX `indx_app_name`(`app_name`),
    PRIMARY KEY (`app_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `downloads` (
    `download_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `app_id` INTEGER NULL,
    `download_tiemstamp` DATETIME(0) NULL,

    INDEX `app_id`(`app_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`download_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `app_id` INTEGER NULL,
    `rating` INTEGER NULL,
    `review_description` TEXT NULL,

    INDEX `indx_app_id`(`app_id`),
    INDEX `indx_user_id`(`user_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth_id` VARCHAR(191) NOT NULL,
    `user_name` VARCHAR(255) NOT NULL,
    `user_icon` VARCHAR(255) NULL,

    UNIQUE INDEX `users_auth_id_key`(`auth_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
