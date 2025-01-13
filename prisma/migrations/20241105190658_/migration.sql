/*
  Warnings:

  - You are about to drop the column `gas_station_marginAL` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_hour_marginAL` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_marginAL` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_type_marginAL` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_hour_marginAL` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `ibm_margin_AL` on the `ibm_info` table. All the data in the column will be lost.
  - You are about to drop the column `region_marginAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_sanado_hour_marginAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_sanado_marginAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_type_marginAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_hour_marginAL` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `regions_margin_AL` on the `regions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" DROP COLUMN "gas_station_marginAL",
DROP COLUMN "gas_station_sanado_hour_marginAL",
DROP COLUMN "gas_station_sanado_marginAL",
DROP COLUMN "gas_station_type_marginAL",
DROP COLUMN "verification_hour_marginAL",
ADD COLUMN     "gas_station_margin_GASOLINA_PREMIUM" DOUBLE PRECISION,
ADD COLUMN     "gas_station_sanado_hour_margin_GASOLINA_PREMIUM" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_margin_GASOLINA_PREMIUM" BOOLEAN,
ADD COLUMN     "gas_station_type_margin_GASOLINA_PREMIUM" BOOLEAN,
ADD COLUMN     "verification_hour_margin_GASOLINA_PREMIUM" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "ibm_info" DROP COLUMN "ibm_margin_AL",
ADD COLUMN     "ibm_margin_GASOLINA_PREMIUM" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "region_setvariables" DROP COLUMN "region_marginAL",
DROP COLUMN "region_sanado_hour_marginAL",
DROP COLUMN "region_sanado_marginAL",
DROP COLUMN "region_type_marginAL",
DROP COLUMN "verification_hour_marginAL",
ADD COLUMN     "region_margin_GASOLINA_PREMIUM" DOUBLE PRECISION,
ADD COLUMN     "region_sanado_hour_margin_GASOLINA_PREMIUM" TIMESTAMP(3),
ADD COLUMN     "region_sanado_margin_GASOLINA_PREMIUM" BOOLEAN,
ADD COLUMN     "region_type_margin_GASOLINA_PREMIUM" BOOLEAN,
ADD COLUMN     "verification_hour_margin_GASOLINA_PREMIUM" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "regions" DROP COLUMN "regions_margin_AL",
ADD COLUMN     "regions_margin_GASOLINA_PREMIUM" DOUBLE PRECISION[];
