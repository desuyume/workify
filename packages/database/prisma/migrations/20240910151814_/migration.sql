/*
  Warnings:

  - You are about to drop the `FeedbackOnUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeedbackOnUsers" DROP CONSTRAINT "FeedbackOnUsers_executorId_fkey";

-- DropForeignKey
ALTER TABLE "FeedbackOnUsers" DROP CONSTRAINT "FeedbackOnUsers_feedbackId_fkey";

-- DropTable
DROP TABLE "FeedbackOnUsers";

-- CreateTable
CREATE TABLE "FeedbackOnVacancy" (
    "id" SERIAL NOT NULL,
    "feedbackId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,

    CONSTRAINT "FeedbackOnVacancy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedbackOnVacancy" ADD CONSTRAINT "FeedbackOnVacancy_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackOnVacancy" ADD CONSTRAINT "FeedbackOnVacancy_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
