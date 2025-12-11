import { prisma } from "@/prisma/prisma";

/**
 * GET /api/images/collections/[unsplashId]
 *
 * Retrieves an image by unsplashId with its collections.
 * Each collection includes its name and up to 3 images.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ unsplashId: string }> },
) {
  try {
    const { unsplashId } = await params;

    const image = await prisma.image.findUnique({
      where: { unsplashId },
      include: {
        collections: {
          include: {
            images: { take: 3 },
            _count: { select: { images: true } },
          },
        },
      },
    });

    if (!image) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const imageWithCount = {
      ...image,
      collections: image.collections.map((collection) => ({
        ...collection,
        totalImages: collection._count.images,
        _count: undefined,
      })),
    };

    return Response.json(imageWithCount);
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
