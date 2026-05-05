import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendMRAMSMS } from '@/lib/sms/mram';
import { getCustomerConfirmationMessage, getAdminAlertMessage } from '@/lib/sms/templates';
import { normalizePhoneNumber } from '@/lib/leads/normalize-phone';

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  project_type: string;
  investment_tier: string;
  project_brief?: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_url?: string;
  device_type: string;
}

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json();

    // 1. Validate required fields
    if (!body.name || !body.phone || !body.project_type || !body.investment_tier) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Normalize and validate phone
    const normalizedPhone = normalizePhoneNumber(body.phone);
    if (!normalizedPhone) {
      return NextResponse.json({ success: false, error: 'Invalid phone number format' }, { status: 400 });
    }

    // 3. Insert lead into Supabase
    // Make sure table is named `leads`
    const { error: insertError } = await supabase.from('leads').insert([{
      name: body.name,
      phone: normalizedPhone,
      email: body.email || null,
      project_type: body.project_type,
      investment_tier: body.investment_tier,
      project_brief: body.project_brief || null,
      source: body.source || 'website',
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      page_url: body.page_url || null,
      device_type: body.device_type || 'desktop',
      status: 'new',
      created_at: new Date().toISOString()
    }]);

    if (insertError) {
      console.error('Supabase Error saving lead:', insertError);
      return NextResponse.json({ success: false, error: 'Submission failed. Please try again.' }, { status: 500 });
    }

    // 4. If insert succeeds, trigger SMS non-blocking
    const customerMsg = getCustomerConfirmationMessage();
    const adminMsg = getAdminAlertMessage({
      name: body.name,
      phone: body.phone,
      project_type: body.project_type,
      investment_tier: body.investment_tier,
      source: body.source,
    });

    // We do NOT await these to finish before returning success, or we catch their errors.
    // Actually, Next.js route handlers might kill promises if they aren't awaited before return.
    // So we await them, but wrap in try/catch to ensure we still return success.
    
    // Customer SMS
    try {
      await sendMRAMSMS(normalizedPhone, customerMsg);
    } catch (smsErr) {
      console.error('Customer SMS failed:', smsErr);
    }

    // Admin SMS
    const adminPhoneStr = process.env.MRAM_ADMIN_PHONE;
    if (adminPhoneStr) {
      const adminPhones = adminPhoneStr.split(',').map(p => p.trim()).filter(Boolean);
      for (const adminPhone of adminPhones) {
        try {
          await sendMRAMSMS(adminPhone, adminMsg);
        } catch (adminSmsErr) {
          console.error(`Admin SMS to ${adminPhone} failed:`, adminSmsErr);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Lead saved' });

  } catch (error: any) {
    console.error('Error in lead submission route:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
