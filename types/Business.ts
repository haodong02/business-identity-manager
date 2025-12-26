export interface Business {
  id: string;
  isPrimary: boolean;
  
  // Business Identity
  businessName: string;
  brn: string;
  tin: string;
  hasSst: boolean;
  sstNumber?: string;

  // Address
  addressLine1: string;
  addressLine2?: string;
  postcode: string;
  city: string;
  state: string;

  // Contact Person
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}
