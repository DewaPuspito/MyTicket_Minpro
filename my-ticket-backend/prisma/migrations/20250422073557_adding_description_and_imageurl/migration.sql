/*
  Warnings:

  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MUSIC', 'SPORTS', 'BUSINESS', 'TECHNOLOGY', 'EDUCATION');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
