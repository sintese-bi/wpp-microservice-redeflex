-- AlterTable
ALTER TABLE "gas_station_setvariables" ADD COLUMN     "gas_station_LUCRO_BRUTO_GALONAGEM_modal" DOUBLE PRECISION,
ADD COLUMN     "gas_station_LUCRO_BRUTO_OPERACIONAL_modal" DOUBLE PRECISION,
ADD COLUMN     "gas_station_LUCRO_BRUTO_PRODUTO_modal" DOUBLE PRECISION,
ADD COLUMN     "gas_station_MLT_modal" DOUBLE PRECISION,
ADD COLUMN     "gas_station_TMC_modal" DOUBLE PRECISION,
ADD COLUMN     "gas_station_TMF_modal" DOUBLE PRECISION,
ADD COLUMN     "gas_station_TMP_modal" DOUBLE PRECISION,
ADD COLUMN     "gas_station_TMVOL_modal" DOUBLE PRECISION,
ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginAL" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_HIDRATADO_COMBUSTIVEL" SET DEFAULT '2023-01-01T00:00:00Z';
