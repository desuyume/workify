-- DropForeignKey
ALTER TABLE "vacancies" DROP CONSTRAINT "vacancies_vacancyCategoryId_fkey";

-- AlterTable
ALTER TABLE "vacancies" ALTER COLUMN "vacancyCategoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_vacancyCategoryId_fkey" FOREIGN KEY ("vacancyCategoryId") REFERENCES "vacancy_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
