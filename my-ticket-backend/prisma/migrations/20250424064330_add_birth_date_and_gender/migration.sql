/*
  Warnings:

  - You are about to drop the column `ticket_name` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_type` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "ticket_name",
DROP COLUMN "ticket_type";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birth_date" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL;
