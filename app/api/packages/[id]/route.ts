import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { Package } from '@/lib/models/Package';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const pkg = await Package.findById(params.id);
    
    if (!pkg) {
      return NextResponse.json(
        { success: false, message: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: pkg });
  } catch (error) {
    console.error('[v0] Error fetching package:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch package' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const updatedPackage = await Package.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPackage) {
      return NextResponse.json(
        { success: false, message: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPackage });
  } catch (error) {
    console.error('[v0] Error updating package:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update package' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const deletedPackage = await Package.findByIdAndDelete(params.id);

    if (!deletedPackage) {
      return NextResponse.json(
        { success: false, message: 'Package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedPackage });
  } catch (error) {
    console.error('[v0] Error deleting package:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete package' },
      { status: 500 }
    );
  }
}
