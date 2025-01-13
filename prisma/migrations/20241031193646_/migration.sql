/*
  Warnings:

  - You are about to drop the column `gas_station_margin_ETANOL_COMUM` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_hour_margin_ETANOL_COMUM` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_margin_ETANOL_COMUM` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_type_margin_ETANOL_COMUM` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_hour_margin_ETANOLCOMUM` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_margin_ETANOL_COMUM` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_sanado_hour_ETANOL_COMUM` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_sanado_margin_ETANOL_COMUM` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_type_margin_ETANOL_COMUM` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_hour_margin_ETANOL_COMUM` on the `region_setvariables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" DROP COLUMN "gas_station_margin_ETANOL_COMUM",
DROP COLUMN "gas_station_sanado_hour_margin_ETANOL_COMUM",
DROP COLUMN "gas_station_sanado_margin_ETANOL_COMUM",
DROP COLUMN "gas_station_type_margin_ETANOL_COMUM",
DROP COLUMN "verification_hour_margin_ETANOLCOMUM",
ADD COLUMN     "gas_station_margin_GASOLINA_PODIUM" DOUBLE PRECISION,
ADD COLUMN     "gas_station_sanado_hour_margin_GASOLINA_PODIUM" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_margin_GASOLINA_PODIUM" BOOLEAN,
ADD COLUMN     "gas_station_type_margin_GASOLINA_PODIUM" BOOLEAN,
ADD COLUMN     "verification_hour_margin_GASOLINA_PODIUM" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" DROP COLUMN "region_margin_ETANOL_COMUM",
DROP COLUMN "region_sanado_hour_ETANOL_COMUM",
DROP COLUMN "region_sanado_margin_ETANOL_COMUM",
DROP COLUMN "region_type_margin_ETANOL_COMUM",
DROP COLUMN "verification_hour_margin_ETANOL_COMUM",
ADD COLUMN     "region_margin_GASOLINA_PODIUM" DOUBLE PRECISION,
ADD COLUMN     "region_sanado_hour_GASOLINA_PODIUM" TIMESTAMP(3),
ADD COLUMN     "region_sanado_margin_GASOLINA_PODIUM" BOOLEAN,
ADD COLUMN     "region_type_margin_GASOLINA_PODIUM" BOOLEAN,
ADD COLUMN     "verification_hour_margin_GASOLINA_PODIUM" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z';
