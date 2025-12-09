import { prisma } from "@/prisma/prisma";
import { Collection } from "@prisma/client";

/**
 * GET /api/collections
 *
 * Retrieves a list of all collections stored in the database.
 * Each collection includes its related images.
 */
export async function GET() {
  try {
    const collections: Collection[] = await prisma.collection.findMany({
      include: { images: false },
    });

    return Response.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch collections" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  } finally {
    await prisma.$disconnect();
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
  } finally {
    await prisma.$disconnect();
  }
}
