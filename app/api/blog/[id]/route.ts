import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { BlogPost } from '@/lib/models/BlogPost';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const post = await BlogPost.findById(params.id);
    
    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('[v0] Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
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
    
    const updatedPost = await BlogPost.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error('[v0] Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
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
    
    const deletedPost = await BlogPost.findByIdAndDelete(params.id);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedPost });
  } catch (error) {
    console.error('[v0] Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
