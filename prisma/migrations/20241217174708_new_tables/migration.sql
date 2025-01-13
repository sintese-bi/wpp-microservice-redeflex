-- AlterTable
ALTER TABLE "gas_station_setvariables" ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP_S500" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_TOTAL_PRODUCT" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ADITIVOS_AUTOMOVEIS_PRODUCT" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_FILTROS_AR_PRODUCT" SET DEFAULT '2023-01-01T00:00:00Z';

-- AlterTable
ALTER TABLE "region_setvariables" ALTER COLUMN "verification_hour_marginGC" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PODIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_GASOLINA_PREMIUM" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_DIESEL_GROUP_S500" SET DEFAULT '2023-01-01T00:00:00Z',
ALTER COLUMN "verification_hour_margin_ETANOL_COMUM" SET DEFAULT '2023-01-01T00:00:00Z';

-- CreateTable
CREATE TABLE "gallon_gross_last_week" (
    "gallon_last_history_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "use_uuid" UUID,
    "gallon_last_history_gross" DOUBLE PRECISION,
    "gallon_last_history_date" TIMESTAMP(3),
    "gallon_last_history_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gallon_last_history_updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallon_gross_last_week_pkey" PRIMARY KEY ("gallon_last_history_uuid")
);

-- CreateTable
CREATE TABLE "product_gross_last_week" (
    "product_last_history_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "use_uuid" UUID,
    "product_last_history_gross" DOUBLE PRECISION,
    "product_last_history_date" TIMESTAMP(3),
    "product_last_history_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_last_history_updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_gross_last_week_pkey" PRIMARY KEY ("product_last_history_uuid")
);

-- AddForeignKey
ALTER TABLE "gallon_gross_last_week" ADD CONSTRAINT "gallon_gross_last_week_use_uuid_fkey" FOREIGN KEY ("use_uuid") REFERENCES "users"("use_uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_gross_last_week" ADD CONSTRAINT "product_gross_last_week_use_uuid_fkey" FOREIGN KEY ("use_uuid") REFERENCES "users"("use_uuid") ON DELETE SET NULL ON UPDATE CASCADE;
