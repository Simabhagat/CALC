import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Get search params from the URL
    const url = new URL(req.url);
    const id = url.searchParams.get('app_id'); // Extract 'id' from the query parameter

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    // Fetch all images with the given ID from the database
    const images = await prisma.image.findMany({
      where: {
        app_id: parseInt(id), // Assuming the ID is an integer, adjust if it's a different type
      },
      select: {
        image_url: true, // Only select the image field
      },
    });

    if (images.length === 0) {
      return NextResponse.json({ error: 'No images found for the given ID' }, { status: 404 });
    }

    // Return the image URLs
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
  }
}
