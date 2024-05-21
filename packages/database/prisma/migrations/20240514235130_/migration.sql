/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `City` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");
