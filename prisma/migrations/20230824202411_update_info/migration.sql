/*
  Warnings:

  - You are about to drop the column `info` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "info";

-- CreateTable
CREATE TABLE "Info" (
    "color" TEXT NOT NULL,
    "colorData" JSONB NOT NULL,
    "productId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Info_color_key" ON "Info"("color");

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
