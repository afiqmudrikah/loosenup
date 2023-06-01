/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Post_userID_key` ON `Post`(`userID`);
