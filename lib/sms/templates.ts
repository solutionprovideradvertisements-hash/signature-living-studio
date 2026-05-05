export function getCustomerConfirmationMessage(): string {
  return `Thank you for contacting Signature Living Studio. We have received your consultation request. Our team will reach you shortly. - Signature Living Studio`;
}

export function getAdminAlertMessage(data: {
  name: string;
  phone: string;
  project_type: string;
  investment_tier: string;
  source: string;
}): string {
  return `New Lead - Signature Living Studio.
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.project_type}
Budget: ${data.investment_tier}
Source: ${data.source}`;
}
