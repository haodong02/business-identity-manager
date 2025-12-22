export interface BusinessFormData {
  // Business Identity
  businessName: string;
  brn: string;
  tin: string;
  hasSst: boolean;
  sstNumber: string;

  // Address
  addressLine1: string;
  addressLine2: string;
  postcode: string;
  city: string;
  state: string;

  // Contact Person
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export const MALAYSIAN_STATES = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
  'W.P. Kuala Lumpur',
  'W.P. Labuan',
  'W.P. Putrajaya',
];