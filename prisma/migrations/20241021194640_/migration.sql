-- AlterTable
ALTER TABLE "gas_station_setvariables" ADD COLUMN     "gas_station_margin_ETANOL_COMUM" DOUBLE PRECISION,
ADD COLUMN     "gas_station_sanado_hour_margin_ETANOL_COMUM" TIMESTAMP(3),
ADD COLUMN     "gas_station_sanado_margin_ETANOL_COMUM" BOOLEAN,
ADD COLUMN     "gas_station_type_margin_ETANOL_COMUM" BOOLEAN,
ADD COLUMN     "verification_hour_margin_ETANOLCOMUM" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "ibm_info" ADD COLUMN     "ibm_margin_ETANOL_COMUM" DOUBLE PRECISION[];

-- AlterTable
ALTER TABLE "region_setvariables" ADD COLUMN     "region_margin_ETANOL_COMUM" DOUBLE PRECISION,
ADD COLUMN     "region_sanado_hour_ETANOL_COMUM" TIMESTAMP(3),
ADD COLUMN     "region_sanado_margin_ETANOL_COMUM" BOOLEAN,
ADD COLUMN     "region_type_margin_ETANOL_COMUM" BOOLEAN,
ADD COLUMN     "verification_hour_margin_ETANOL_COMUM" TIMESTAMP(3) DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "regions" ADD COLUMN     "regions_margin_ETANOL_COMUM" DOUBLE PRECISION[];
