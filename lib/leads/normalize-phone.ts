export function normalizePhoneNumber(phone: string): string | null {
  if (!phone) return null;
  
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
  } else if (cleanNumber.startsWith('8801') && cleanNumber.length === 13) {
    // Already in correct format
  } else {
    // Invalid Bangladeshi number format
    return null;
  }
  
  return cleanNumber;
}
