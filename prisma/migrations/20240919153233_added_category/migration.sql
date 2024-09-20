/*
  Warnings:

  - Added the required column `category` to the `apps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `apps` ADD COLUMN `category` VARCHAR(255) NOT NULL;
