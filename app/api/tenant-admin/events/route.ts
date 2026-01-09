import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:7000';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const res = await fetch(`${BACKEND_URL}/tenant-admin/events`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized - Please login' }, { status: 401 });
    }
    
    const body = await request.json();
    
    console.log('Creating event with data:', body);
    
    const res = await fetch(`${BACKEND_URL}/tenant-admin/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error('Backend error:', data);
      return NextResponse.json(data, { status: res.status });
    }
    
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ 
      error: 'Failed to create event', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
