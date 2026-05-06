import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { Contact } from '@/lib/models/Contact';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const contact = await Contact.findById(params.id);
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error('[v0] Error fetching contact:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contact' },
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
    
    const updatedContact = await Contact.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedContact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedContact });
  } catch (error) {
    console.error('[v0] Error updating contact:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update contact' },
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
    
    const deletedContact = await Contact.findByIdAndDelete(params.id);

    if (!deletedContact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedContact });
  } catch (error) {
    console.error('[v0] Error deleting contact:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}
