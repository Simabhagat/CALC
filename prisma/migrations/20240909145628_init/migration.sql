-- CreateTable
CREATE TABLE `App` (
    `app_id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_name` VARCHAR(191) NOT NULL,
    `app_icon` VARCHAR(191) NULL,
    `app_description` VARCHAR(191) NULL,
    `apk_url` VARCHAR(191) NULL,
    `apk_size` BIGINT NULL,

    UNIQUE INDEX `App_app_name_key`(`app_name`),
    PRIMARY KEY (`app_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `user_icon` VARCHAR(191) NULL,

    UNIQUE INDEX `User_user_name_key`(`user_name`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `app_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `review_description` VARCHAR(191) NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Download` (
    `download_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `app_id` INTEGER NOT NULL,
    `download_timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`download_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppScreenshot` (
    `app_screenshot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_id` INTEGER NOT NULL,
    `screenshots_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`app_screenshot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `App`(`app_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Download` ADD CONSTRAINT `Download_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Download` ADD CONSTRAINT `Download_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `App`(`app_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppScreenshot` ADD CONSTRAINT `AppScreenshot_app_id_fkey` FOREIGN KEY (`app_id`) REFERENCES `App`(`app_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
