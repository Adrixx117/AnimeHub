/*
  Warnings:

  - You are about to drop the column `serieId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the `Serie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `series` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_serieId_fkey";

-- DropForeignKey
ALTER TABLE "Serie" DROP CONSTRAINT "Serie_userId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "serieId",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "series" TEXT NOT NULL;

-- DropTable
DROP TABLE "Serie";

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
