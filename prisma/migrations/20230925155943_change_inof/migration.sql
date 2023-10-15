/*
  Warnings:

  - You are about to drop the `Info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Info" DROP CONSTRAINT "Info_productId_fkey";

-- DropTable
DROP TABLE "Info";

-- CreateTable
CREATE TABLE "color" (
    "colorName" TEXT NOT NULL,
    "colorSizes" INTEGER[],
    "productId" INTEGER
);

-- CreateTable
CREATE TABLE "colorObject" (
    "id" SERIAL NOT NULL,
    "small" TEXT NOT NULL,
    "normal" TEXT NOT NULL,
    "colorColorName" TEXT,

    CONSTRAINT "colorObject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "color_colorName_key" ON "color"("colorName");

-- AddForeignKey
ALTER TABLE "color" ADD CONSTRAINT "color_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colorObject" ADD CONSTRAINT "colorObject_colorColorName_fkey" FOREIGN KEY ("colorColorName") REFERENCES "color"("colorName") ON DELETE SET NULL ON UPDATE CASCADE;
