/*
  Warnings:

  - You are about to drop the column `location` on the `vacancies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vacancies" DROP COLUMN "location",
ADD COLUMN     "cityName" TEXT;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_cityName_fkey" FOREIGN KEY ("cityName") REFERENCES "City"("name") ON DELETE SET NULL ON UPDATE CASCADE;
