// src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('query') || '';

    // Query the database for categories or games that match the search query
    const results = await prisma.apps.findMany({
      where: {
        category : {
          contains: searchQuery,
        },
      },
    });

    // Convert BigInt fields to strings
    const serializedResults = results.map((app) => ({
      ...app,
      apk_size: app.apk_size?.toString(), // Convert BigInt to string
    }));


    return NextResponse.json(serializedResults);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while searching" }, { status: 500 });
  }
}
