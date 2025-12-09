-- CreateTable
CREATE TABLE "Collection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unsplashId" TEXT NOT NULL,
    "raw" TEXT NOT NULL,
    "full" TEXT NOT NULL,
    "regular" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "thumb" TEXT NOT NULL,
    "collectionId" INTEGER NOT NULL,
    CONSTRAINT "Image_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_unsplashId_key" ON "Image"("unsplashId");
