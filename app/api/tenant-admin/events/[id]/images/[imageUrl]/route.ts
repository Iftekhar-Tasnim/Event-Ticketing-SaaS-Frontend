import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:7000';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; imageUrl: string } }
) {
  try {
    const token = request.cookies.get('token')?.value;
    
    const res = await fetch(
      `${BACKEND_URL}/tenant-admin/events/${params.id}/images/${params.imageUrl}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
