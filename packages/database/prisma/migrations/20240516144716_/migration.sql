/*
  Warnings:

  - Made the column `population` on table `City` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "City" ALTER COLUMN "population" SET NOT NULL,
ALTER COLUMN "population" SET DEFAULT 0;
