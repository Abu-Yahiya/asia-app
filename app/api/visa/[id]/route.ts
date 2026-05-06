import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { VisaCountry } from '@/lib/models/VisaCountry';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const country = await VisaCountry.findById(params.id);
    
    if (!country) {
      return NextResponse.json(
        { success: false, message: 'Visa country not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: country });
  } catch (error) {
    console.error('[v0] Error fetching visa country:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch visa country' },
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
    
    const updatedCountry = await VisaCountry.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCountry) {
      return NextResponse.json(
        { success: false, message: 'Visa country not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedCountry });
  } catch (error) {
    console.error('[v0] Error updating visa country:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update visa country' },
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
    
    const deletedCountry = await VisaCountry.findByIdAndDelete(params.id);

    if (!deletedCountry) {
      return NextResponse.json(
        { success: false, message: 'Visa country not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedCountry });
  } catch (error) {
    console.error('[v0] Error deleting visa country:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete visa country' },
      { status: 500 }
    );
  }
}
