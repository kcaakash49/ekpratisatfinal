

-- Adding latitude and longitude with default values for existing rows
ALTER TABLE "Listings" 
ADD COLUMN "latitude" DOUBLE PRECISION,
ADD COLUMN "longitude" DOUBLE PRECISION;

UPDATE "Listings"
SET "latitude" = 27.7172, "longitude" = 85.3240; -- Set to default Kathmandu coordinates

-- After updating existing data, make sure these columns are nullable
ALTER TABLE "Listings" 
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
