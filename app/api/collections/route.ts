import { prisma } from "@/prisma/prisma";

export async function getCollectionsData() {
  const collections = await prisma.collection.findMany({
    include: {
      images: { take: 3 },
      _count: { select: { images: true } },
    },
  });

  const collectionsWithCount = collections.map((collection) => ({
    ...collection,
    totalImages: collection._count.images,
    _count: undefined,
  }));

  return collectionsWithCount;
}

/**
 * GET /api/collections
 *
 * Retrieves a list of all collections stored in the database.
 * Each collection includes its related images.
 * Optionally filter by unsplashId to get only collections containing that image.
 */
export async function GET() {
  try {
    const collections = await getCollectionsData();
    return Response.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch collections" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const newCollection = await prisma.collection.create({
      data: {
        name,
      },
    });

    return Response.json(newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create collection" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
