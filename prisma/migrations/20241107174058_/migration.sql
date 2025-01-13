/*
  Warnings:

  - You are about to drop the column `regions_margin_ETANOL_DIESEL_GROUP` on the `regions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "regions" DROP COLUMN "regions_margin_ETANOL_DIESEL_GROUP",
ADD COLUMN     "regions_margin_DIESEL_GROUP" DOUBLE PRECISION[];
