'use server';

import { sendMRAMSMS } from '@/lib/sms';

export async function sendLeadNotifications(data: {
  name: string;
  phone: string;
  project_type: string;
  budget_range: string;
}) {
  const customerEnabled = process.env.MRAM_SMS_CUSTOMER_ENABLED !== 'false';
  const adminEnabled = process.env.MRAM_SMS_ADMIN_ENABLED !== 'false';
  const adminPhone = process.env.MRAM_ADMIN_PHONE;

  const results = {
    customer: null as any,
    admin: null as any,
  };

  // 1. Send SMS to Customer
  if (customerEnabled) {
    // Premium, brand-consistent confirmation message
    const customerMsg = `Thank you for contacting Signature Living Studio. We have received your consultation request. Our team will contact you shortly.`;
    const res = await sendMRAMSMS(data.phone, customerMsg);
    results.customer = res;
  }

  // 2. Send SMS to Admin
  if (adminEnabled && adminPhone) {
    // Short alert message for internal team
    const adminMsg = `New Lead - Signature Living Studio. Name: ${data.name}, Phone: ${data.phone}, Service: ${data.project_type}, Budget: ${data.budget_range}.`;
    const adminPhones = adminPhone.split(',').map(p => p.trim());
    
    // We send to the first admin phone, or all if multiple are separated by commas
    results.admin = [];
    for (const phone of adminPhones) {
      if (phone) {
        const res = await sendMRAMSMS(phone, adminMsg);
        results.admin.push(res);
      }
    }
  } else if (!adminPhone) {
     console.warn('MRAM_ADMIN_PHONE is not set. Admin SMS skipped.');
  }

  return results;
}
