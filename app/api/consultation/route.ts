import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Server-side validation can be added here
    // Example: Forwarding to a CRM, sending an email via SendGrid, or inserting into Supabase
    
    console.log('Received consultation request:', data);

    return NextResponse.json({ success: true, message: 'Request received successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error handling consultation submission:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
