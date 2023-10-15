/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "purchasesCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Images";
