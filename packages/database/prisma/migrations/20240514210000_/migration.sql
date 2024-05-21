/*
  Warnings:

  - Added the required column `cover_img` to the `vacancies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacancies" ADD COLUMN     "cover_img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vacancy_photos" ADD COLUMN     "vacancyId" INTEGER;

-- AddForeignKey
ALTER TABLE "vacancy_photos" ADD CONSTRAINT "vacancy_photos_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
