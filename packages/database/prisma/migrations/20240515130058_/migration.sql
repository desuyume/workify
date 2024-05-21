/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `vacancy_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vacancy_categories_title_key" ON "vacancy_categories"("title");
