/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "vacancies" DROP CONSTRAINT "vacancies_cityName_fkey";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "cities" (
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "population" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_cityName_fkey" FOREIGN KEY ("cityName") REFERENCES "cities"("name") ON DELETE SET NULL ON UPDATE CASCADE;
