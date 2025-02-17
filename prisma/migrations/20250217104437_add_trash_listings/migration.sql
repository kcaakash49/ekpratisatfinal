-- CreateTable
CREATE TABLE "TrashListings" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bathrooms" INTEGER,
    "bedrooms" INTEGER,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "landArea" INTEGER,
    "numberOfFloors" INTEGER,
    "area" INTEGER,
    "houseArea" INTEGER,
    "userId" INTEGER NOT NULL,
    "images" TEXT[],
    "created" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TrashListings_id_key" ON "TrashListings"("id");
