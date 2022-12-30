/*
  Warnings:

  - You are about to drop the column `state` on the `User` table. All the data in the column will be lost.
  - Added the required column `region` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `state`,
    ADD COLUMN `region` VARCHAR(191) NOT NULL;
