import { prisma } from "@/prisma/prisma";
import { Collection } from "@/app/generated/client";

/**
 * GET /api/collections
 *
 * Retrieves a list of all collections stored in the database.
 * Each collection includes its related images.
 */
export async function GET() {
  try {
    const collections: Collection[] = await prisma.collection.findMany({
      include: { images: true },
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
