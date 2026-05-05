import { normalizePhoneNumber } from '../leads/normalize-phone';

interface SMSResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function sendMRAMSMS(to: string, message: string): Promise<SMSResult> {
  try {
    const isEnabled = process.env.MRAM_SMS_ENABLED === 'true';
    if (!isEnabled) {
      console.log('MRAM_SMS_ENABLED is false. Skipping SMS sending.');
      return { success: true };
    }

    const apiKey = process.env.MRAM_SMS_API_KEY;
    const senderId = process.env.MRAM_SMS_SENDER_ID;
    const type = process.env.MRAM_SMS_TYPE || 'text';
    const baseUrl = process.env.MRAM_SMS_BASE_URL || 'https://msg.mram.com.bd/smsapi';

    if (!apiKey || !senderId) {
      console.error('MRAM SMS API Key or Sender ID is missing.');
      return { success: false, error: 'Missing credentials' };
    }

    const formattedNumber = normalizePhoneNumber(to);
    
    if (!formattedNumber) {
        return { success: false, error: 'Invalid phone number format' };
    }

    // Construct URL
    const endpoint = baseUrl.endsWith('/smsapi') ? baseUrl : `${baseUrl.replace(/\/$/, '')}/smsapi`;
    const url = new URL(endpoint);
    url.searchParams.append('api_key', apiKey);
    url.searchParams.append('type', type);
    url.searchParams.append('contacts', formattedNumber);
    url.searchParams.append('senderid', senderId);
    url.searchParams.append('msg', message);
    
    if (process.env.MRAM_SMS_LABEL) {
       url.searchParams.append('label', process.env.MRAM_SMS_LABEL);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    const responseText = await response.text();
    console.log(`MRAM API Response for ${formattedNumber}: ${responseText}`);

    // MRAM Error Codes parsing
    const mramErrorCodeStr = [
      '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009',
      '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1019'
    ];

    let isError = false;
    let errorDesc = '';

    for (const code of mramErrorCodeStr) {
      if (responseText.includes(code)) {
        isError = true;
        errorDesc = `MRAM Error ${code}`;
        break;
      }
    }

    if (!response.ok || isError) {
       return { success: false, error: errorDesc || 'Failed to send SMS' };
    }

    return { success: true, data: responseText };

  } catch (error: any) {
    console.error('Exception in sendMRAMSMS:', error);
    return { success: false, error: error.message };
  }
}
