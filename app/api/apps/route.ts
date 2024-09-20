import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get('app_id') || '');

    // Fetch all apps from the database
    const app = await prisma.apps.findUnique({
      where : {app_id : id}
    });
    
    // Convert any BigInt values to strings
    const transformedApps = {
      ...app,
      apk_size: app?.apk_size?.toString() // Convert BigInt to string
    };

    return NextResponse.json(transformedApps, { status: 200 });
  } catch (error) {
    console.error('Error fetching apps:', error);
    return NextResponse.json({ error: 'Error fetching apps' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { app_name, app_icon, app_description, apk_url, apk_size, category, app_rating, app_publisher } = body

    // Create a new app using Prisma
    const newApp = await prisma.apps.create({
      data: {
        app_name,
        app_icon,
        app_description,
        apk_url,
        apk_size,
        category,
        app_rating,
        app_publisher,
      },
    })
    //transform bigInt to string 
    const transformedApp = {
        ...newApp,
        apk_size: newApp.apk_size?.toString() 
      };

    return NextResponse.json(transformedApp, { status: 201 }) // Return the newly created app with 201 status code
  } catch (error) {
    console.error('Error creating app:', error) // Log the error details
    return NextResponse.json({ error: 'Error creating app' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { app_id, app_name, app_icon, app_description, apk_size } = body;

    // Check if `id` is provided (since this is required for updating)
    if (!app_id) {
      return NextResponse.json({ error: 'App ID is required for updating' }, { status: 400 });
    }

    // Prepare an update object with only provided fields
    const updateData: any = {};

    if (app_name) updateData.app_name = app_name;
    if (app_icon) updateData.app_icon = app_icon;
    if (app_description) updateData.app_description = app_description;
    if (apk_size) updateData.apk_size = apk_size;

    // Perform the update with the dynamic `updateData` object
    const updatedApp = await prisma.apps.update({
      where: { app_id: app_id },
      data: updateData, // Only the fields that are provided in the request body will be updated
    });

    // Convert BigInt to string (if applicable)
    const transformedApp = {
      ...updatedApp,
      apk_size: updatedApp.apk_size?.toString(),
    };

    return NextResponse.json(transformedApp, { status: 200 });
  } catch (error) {
    console.error('Error updating app:', error);
    return NextResponse.json({ error: 'Error updating app' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    // Parse request URL to get the app ID
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get('id') || '');

    // Delete an app from the database
    const deletedApp = await prisma.apps.delete({
      where: { app_id: id },
    });

    // Convert BigInt values to strings
    const transformedApp = {
      ...deletedApp,
      apk_size: deletedApp.apk_size?.toString()
    };

    return NextResponse.json(transformedApp, { status: 200 });
  } catch (error) {
    console.error('Error deleting app:', error);
    return NextResponse.json({ error: 'Error deleting app' }, { status: 500 });
  }
}