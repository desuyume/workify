/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Communication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Communication_userId_key" ON "Communication"("userId");
