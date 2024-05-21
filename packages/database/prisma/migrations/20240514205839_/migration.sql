/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "location" TEXT,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "vacancyCategoryId" INTEGER NOT NULL,

    CONSTRAINT "vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancy_categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "vacancy_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancy_photos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "vacancy_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_vacancyCategoryId_fkey" FOREIGN KEY ("vacancyCategoryId") REFERENCES "vacancy_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
