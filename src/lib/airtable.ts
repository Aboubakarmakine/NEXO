const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const WAITLIST_TABLE = 'WaitlistSignups';
const CONTACT_TABLE = 'ContactSubmissions';

export interface WaitlistData {
  role: 'worker' | 'employer' | 'partner' | 'investor';
  fullName: string;
  email: string;
  country: string;
  phone?: string;
  consent: boolean;
  sourcePage?: string;
  submittedAt: string;
  // Conditional fields — Worker
  tradeSkillArea?: string;
  yearsExperience?: string;
  countryOfWork?: string;
  workerNote?: string;
  // Conditional fields — Employer
  companyName?: string;
  industryType?: string;
  hiringInterest?: string;
  operationsCountry?: string;
  // Conditional fields — Partner
  organizationName?: string;
  organizationType?: string;
  partnershipInterest?: string;
  // Conditional fields — Investor
  firmAffiliation?: string;
  interestType?: string;
  investorMessage?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export async function submitToWaitlist(data: WaitlistData): Promise<void> {
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${WAITLIST_TABLE}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Full Name': data.fullName,
          'Email': data.email,
          'Country': data.country,
          'Phone': data.phone || '',
          'Role': data.role,
          'Consent': data.consent,
          'Source Page': data.sourcePage || 'waitlist',
          'Submitted At': data.submittedAt,
          'Trade / Skill Area': data.tradeSkillArea || '',
          'Years of Experience': data.yearsExperience || '',
          'Country of Work': data.countryOfWork || '',
          'Worker Note': data.workerNote || '',
          'Company Name': data.companyName || '',
          'Industry Type': data.industryType || '',
          'Hiring Interest': data.hiringInterest || '',
          'Operations Country': data.operationsCountry || '',
          'Organization Name': data.organizationName || '',
          'Organization Type': data.organizationType || '',
          'Partnership Interest': data.partnershipInterest || '',
          'Firm Affiliation': data.firmAffiliation || '',
          'Interest Type': data.interestType || '',
          'Investor Message': data.investorMessage || '',
        },
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Airtable waitlist submission failed:', errorBody);
    throw new Error('Waitlist submission failed. Please try again.');
  }
}

export async function submitContact(data: ContactData): Promise<void> {
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${CONTACT_TABLE}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Name': data.name,
          'Email': data.email,
          'Subject': data.subject,
          'Message': data.message,
          'Submitted At': data.submittedAt,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Airtable contact submission failed:', errorBody);
    throw new Error('Contact submission failed. Please try again.');
  }
}
