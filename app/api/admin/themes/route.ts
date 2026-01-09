import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:7000';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    const res = await fetch(`${BACKEND_URL}/admin/themes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch themes' }, { status: 500 });
  }
}
