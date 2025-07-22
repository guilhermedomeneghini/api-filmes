/*
  Warnings:

  - Added the required column `classificacao` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diretor` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idioma` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filme" ADD COLUMN     "atores" TEXT[],
ADD COLUMN     "classificacao" INTEGER NOT NULL,
ADD COLUMN     "diretor" TEXT NOT NULL,
ADD COLUMN     "idioma" TEXT NOT NULL;
