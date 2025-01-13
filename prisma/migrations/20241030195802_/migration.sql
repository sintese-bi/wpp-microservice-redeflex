/*
  Warnings:

  - You are about to drop the column `gas_station_margin_GASOLINE_GROUP2` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_hour_margin_GASOLINE_GROUP2` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_sanado_margin_GASOLINE_GROUP2` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `gas_station_type_margin_GASOLINE_GROUP2` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_hour_margin_GASOLINE_GROUP2` on the `gas_station_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_margin_GASOLINE_GROUP2` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_sanado_hour_margin_GASOLINE_GROUP2` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_sanado_margin_GASOLINE_GROUP2` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `region_type_margin_GASOLINE_GROUP2` on the `region_setvariables` table. All the data in the column will be lost.
  - You are about to drop the column `verification_hour_margin_GASOLINE_GROUP2` on the `region_setvariables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gas_station_setvariables" DROP COLUMN "gas_station_margin_GASOLINE_GROUP2",
DROP COLUMN "gas_station_sanado_hour_margin_GASOLINE_GROUP2",
DROP COLUMN "gas_station_sanado_margin_GASOLINE_GROUP2",
DROP COLUMN "gas_station_type_margin_GASOLINE_GROUP2",
DROP COLUMN "verification_hour_margin_GASOLINE_GROUP2",
ADD COLUMN     "gas_station_margin_DIESEL_GROUP" DOUBLE PRECISION,
ADD COLUMN     "gas_station_sanado_hour_margin_DIESEL_GROUP" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_margin_DIESEL_GROUP" BOOLEAN,
ADD COLUMN     "gas_station_type_margin_DIESEL_GROUP" BOOLEAN,
ADD COLUMN     "verification_hour_margin_DIESEL_GROUP" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOLCOMUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" DROP COLUMN "region_margin_GASOLINE_GROUP2",
DROP COLUMN "region_sanado_hour_margin_GASOLINE_GROUP2",
DROP COLUMN "region_sanado_margin_GASOLINE_GROUP2",
DROP COLUMN "region_type_margin_GASOLINE_GROUP2",
DROP COLUMN "verification_hour_margin_GASOLINE_GROUP2",
ADD COLUMN     "region_margin_DIESEL_GROUP" DOUBLE PRECISION,
ADD COLUMN     "region_sanado_hour_margin_DIESEL_GROUP" TIMESTAMP(3),
ADD COLUMN     "region_sanado_margin_DIESEL_GROUP" BOOLEAN,
ADD COLUMN     "region_type_margin_DIESEL_GROUP" BOOLEAN,
ADD COLUMN     "verification_hour_margin_DIESEL_GROUP" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z';
