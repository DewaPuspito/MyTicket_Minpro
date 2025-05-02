/*
  Warnings:

  - You are about to drop the column `discount` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `point_received` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "discount",
DROP COLUMN "source",
ADD COLUMN     "point_received" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Source";
