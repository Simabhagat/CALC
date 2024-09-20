-- CreateTable
CREATE TABLE `image` (
    `image_url` VARCHAR(191) NOT NULL,
    `app_id` INTEGER NULL,

    UNIQUE INDEX `image_image_url_key`(`image_url`),
    PRIMARY KEY (`image_url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
