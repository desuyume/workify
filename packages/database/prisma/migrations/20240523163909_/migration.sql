-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "comment" VARCHAR(1500),
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "photo" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackOnUsers" (
    "id" SERIAL NOT NULL,
    "feedbackId" INTEGER NOT NULL,
    "executorId" INTEGER NOT NULL,

    CONSTRAINT "FeedbackOnUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackOnUsers" ADD CONSTRAINT "FeedbackOnUsers_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackOnUsers" ADD CONSTRAINT "FeedbackOnUsers_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
