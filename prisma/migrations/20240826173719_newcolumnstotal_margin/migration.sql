-- AlterTable
ALTER TABLE "ibm_info" ADD COLUMN     "ibm_margin_AL" DOUBLE PRECISION,
ADD COLUMN     "ibm_margin_GC" DOUBLE PRECISION,
ADD COLUMN     "ibm_margin_Total" DOUBLE PRECISION,
ADD COLUMN     "ibm_volume_AL" DOUBLE PRECISION,
ADD COLUMN     "ibm_volume_GC" DOUBLE PRECISION,
ADD COLUMN     "ibm_volume_Total" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "regions" ADD COLUMN     "regions_margin_AL" DOUBLE PRECISION,
ADD COLUMN     "regions_margin_GC" DOUBLE PRECISION,
ADD COLUMN     "regions_margin_Total" DOUBLE PRECISION,
ADD COLUMN     "regions_volume_AL" DOUBLE PRECISION,
ADD COLUMN     "regions_volume_GC" DOUBLE PRECISION,
ADD COLUMN     "regions_volume_Total" DOUBLE PRECISION;
