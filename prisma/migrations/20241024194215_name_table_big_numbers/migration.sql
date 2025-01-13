/*
  Warnings:

  - You are about to drop the `bignumbers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOLCOMUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINE_GROUP2" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINE_GROUP2" SET DEFAULT '2023-01-01T00:00:00Z';

-- DropTable
DROP TABLE "bignumbers";

-- CreateTable
CREATE TABLE "big_numbers_values" (
    "bignumbers_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "bignumbers_sumliterage" DOUBLE PRECISION,
    "bignumbers_invoicing" DOUBLE PRECISION,
    "bignumbers_Supplies" DOUBLE PRECISION,
    "bignumbers_fuelSales" DOUBLE PRECISION,
    "bignumbers_fuelProfit" DOUBLE PRECISION,
    "bignumbers_productSales" DOUBLE PRECISION,
    "bignumbers_productProfit" DOUBLE PRECISION,

    CONSTRAINT "big_numbers_values_pkey" PRIMARY KEY ("bignumbers_uuid")
);
