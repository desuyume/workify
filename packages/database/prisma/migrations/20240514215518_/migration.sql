/*
  Warnings:

  - You are about to drop the column `cover_img` on the `vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `isHidden` on the `vacancies` table. All the data in the column will be lost.
  - Added the required column `price` to the `vacancies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacancies" DROP COLUMN "cover_img",
DROP COLUMN "isHidden",
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "isLocationHidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVacancyHidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
