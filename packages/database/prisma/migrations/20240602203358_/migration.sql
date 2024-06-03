/*
  Warnings:

  - You are about to drop the column `userId` on the `Communication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[communicationId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Communication" DROP CONSTRAINT "Communication_userId_fkey";

-- DropIndex
DROP INDEX "Communication_userId_key";

-- AlterTable
ALTER TABLE "Communication" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "communicationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_communicationId_key" ON "users"("communicationId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_communicationId_fkey" FOREIGN KEY ("communicationId") REFERENCES "Communication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
