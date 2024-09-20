/*
  Warnings:

  - Added the required column `app_publisher` to the `apps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `app_rating` to the `apps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `apps` ADD COLUMN `app_publisher` VARCHAR(255) NOT NULL,
    ADD COLUMN `app_rating` VARCHAR(255) NOT NULL;
