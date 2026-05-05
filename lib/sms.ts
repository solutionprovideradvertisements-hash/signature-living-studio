export function formatPhoneNumberForMRAM(phone: string): string {
  // Remove all non-numeric characters
  let cleanNumber = phone.replace(/\D/g, '');
  
  // Format to expected Bangladeshi format (8801...)
  if (cleanNumber.startsWith('01') && cleanNumber.length === 11) {
    cleanNumber = '88' + cleanNumber;
  } else if (cleanNumber.startsWith('1') && cleanNumber.length === 10) {
    cleanNumber = '880' + cleanNumber;
  } else if (cleanNumber.startsWith('+8801') && cleanNumber.length === 14) {
    // Already handled by regex replace, but just in case
    cleanNumber = cleanNumber.substring(1); 
  }
  
  return cleanNumber;
}

export async function sendMRAMSMS(to: string, message: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const isEnabled = process.env.MRAM_SMS_ENABLED === 'true';
    if (!isEnabled) {
      console.log('MRAM_SMS_ENABLED is false. Skipping SMS sending.');
      return { success: true };
    }

    const apiKey = process.env.MRAM_SMS_API_KEY;
    const senderId = process.env.MRAM_SMS_SENDER_ID;
    const type = process.env.MRAM_SMS_TYPE || 'text';
    const baseUrl = process.env.MRAM_SMS_BASE_URL || 'https://msg.mram.com.bd';

    if (!apiKey || !senderId) {
      console.error('MRAM SMS API Key or Sender ID is missing in environment variables.');
      return { success: false, error: 'Missing credentials' };
    }

    const formattedNumber = formatPhoneNumberForMRAM(to);
    
    if (!formattedNumber || formattedNumber.length < 11) {
        return { success: false, error: 'Invalid phone number format' };
    }

    // Construct correct URL preventing '/smsapi/smsapi'
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

    console.log(`Sending SMS to ${formattedNumber}...`);
    
    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    const responseText = await response.text();
    console.log(`MRAM API Response for ${formattedNumber}:`, responseText);

    // Common error codes from MRAM
    const mramErrors: Record<string, string> = {
      '1002': 'Sender Id/Masking Not Found',
      '1003': 'API Not Found',
      '1004': 'SPAM Detected',
      '1005': 'Internal Error',
      '1006': 'Internal Error',
      '1007': 'Balance Insufficient',
      '1008': 'Message is empty',
      '1009': 'Message Type Not Set',
      '1010': 'Invalid User & Password',
      '1011': 'Invalid User Id',
      '1012': 'Invalid Number',
      '1013': 'API limit error',
      '1014': 'No matching template',
      '1015': 'SMS Content Validation Fails',
      '1016': 'IP address not allowed',
      '1019': 'SMS Purpose Missing',
    };

    let isError = false;
    let errorDesc = '';

    // Check if the response matches any known error code
    for (const code in mramErrors) {
      if (responseText.includes(code)) {
        isError = true;
        errorDesc = mramErrors[code];
        break;
      }
    }

    if (!response.ok || isError) {
       return { success: false, error: `MRAM Error: ${responseText} - ${errorDesc}` };
    }

    return { success: true, data: responseText };

  } catch (error: any) {
    console.error('Error in sendMRAMSMS:', error);
    return { success: false, error: error.message };
  }
}
