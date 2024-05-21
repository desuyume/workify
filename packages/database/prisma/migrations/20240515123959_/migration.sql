/*
  Warnings:

  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "city",
ADD COLUMN     "login" TEXT;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
