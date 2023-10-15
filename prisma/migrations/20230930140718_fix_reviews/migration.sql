/*
  Warnings:

  - You are about to drop the `Rewiew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rewiew" DROP CONSTRAINT "Rewiew_productId_fkey";

-- DropTable
DROP TABLE "Rewiew";

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL,
    "productId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
