/*
  Warnings:

  - Added the required column `userId` to the `vacancies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacancies" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
