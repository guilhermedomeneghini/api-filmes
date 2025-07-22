-- AlterTable
ALTER TABLE "Filme" ALTER COLUMN "classificacao" DROP NOT NULL,
ALTER COLUMN "classificacao" SET DEFAULT 0;
