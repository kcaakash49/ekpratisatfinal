-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" BYTEA NOT NULL,
    "listingId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
