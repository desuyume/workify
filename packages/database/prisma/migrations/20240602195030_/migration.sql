-- CreateTable
CREATE TABLE "Communication" (
    "id" SERIAL NOT NULL,
    "isEmailVisible" BOOLEAN NOT NULL DEFAULT false,
    "isPhoneVisible" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
