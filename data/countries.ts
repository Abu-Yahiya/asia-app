export interface VisaCountry {
  slug: string;
  name: string;
  flag: string;
  processing: string;
  type: string;
  description: string;
  requirements: string[];
  documents: string[];
  fees: { type: string; amount: string }[];
  tips: string[];
}

export const visaTypes = [
  { value: "tourist", label: "Tourist Visa" },
  { value: "work", label: "Work Visa" },
  { value: "medical", label: "Medical Visa" },
  { value: "student", label: "Student Visa" },
];

export const countries: VisaCountry[] = [
  {
    slug: "united-states",
    name: "United States",
    flag: "🇺🇸",
    processing: "3-5 days",
    type: "Tourist/Business",
    description:
      "The United States offers various visa categories for tourists, business travelers, students, and workers. Our experts ensure your DS-160 application is flawless.",
    requirements: [
      "Valid passport (6+ months validity)",
      "Completed DS-160 form",
      "Passport-size photograph (2x2 inches)",
      "Proof of financial stability",
      "Travel itinerary",
      "Employment/enrollment proof",
      "Previous travel history",
    ],
    documents: [
      "Original passport",
      "Bank statements (last 6 months)",
      "Employment letter",
      "Hotel/accommodation booking",
      "Return flight tickets",
      "Invitation letter (if applicable)",
    ],
    fees: [
      { type: "B1/B2 Tourist/Business", amount: "$185" },
      { type: "F1 Student Visa", amount: "$185" },
      { type: "H1B Work Visa", amount: "$205" },
    ],
    tips: [
      "Schedule your embassy interview early",
      "Prepare concise answers for the interview",
      "Carry all original documents",
      "Show strong ties to your home country",
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    flag: "🇬🇧",
    processing: "5-7 days",
    type: "Visitor Visa",
    description:
      "The UK Standard Visitor visa lets you visit for tourism, business meetings, or short courses. We guide you through the online application and biometrics process.",
    requirements: [
      "Valid passport",
      "Completed online application",
      "Biometric appointment",
      "Financial proof",
      "Accommodation details",
      "Travel history",
    ],
    documents: [
      "Current passport",
      "Bank statements (last 3 months)",
      "Employer letter with salary details",
      "Hotel bookings",
      "Flight itinerary",
      "TB test results (if applicable)",
    ],
    fees: [
      { type: "Standard Visitor (6 months)", amount: "£115" },
      { type: "Student Visa", amount: "£490" },
      { type: "Skilled Worker", amount: "£719" },
    ],
    tips: [
      "Apply at least 3 weeks before travel",
      "Ensure all documents are in English",
      "Book biometrics appointment early",
      "Provide a detailed travel itinerary",
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    processing: "7-10 days",
    type: "Tourist/Work",
    description:
      "Canada offers eTA for visa-exempt nationals and visitor visas for others. Our team handles your application from start to finish for smooth processing.",
    requirements: [
      "Valid passport",
      "Digital photograph",
      "Proof of funds",
      "Purpose of visit documentation",
      "Travel history",
      "Ties to home country proof",
    ],
    documents: [
      "Passport with 6+ months validity",
      "Bank statements",
      "Employment verification",
      "Invitation letter (if visiting someone)",
      "Travel itinerary",
      "Previous visa copies",
    ],
    fees: [
      { type: "Visitor Visa", amount: "CAD $100" },
      { type: "eTA", amount: "CAD $7" },
      { type: "Study Permit", amount: "CAD $150" },
    ],
    tips: [
      "Apply online for faster processing",
      "Submit biometrics within 30 days of application",
      "Provide comprehensive financial documents",
      "Include a travel plan with dates and activities",
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    processing: "5-7 days",
    type: "eVisitor",
    description:
      "Australia's eVisitor (subclass 651) and ETA make it easy for eligible nationals. For others, we streamline the visitor visa (subclass 600) process.",
    requirements: [
      "Valid passport",
      "Health declaration",
      "Character requirements",
      "Financial proof",
      "Purpose of travel",
      "Health insurance",
    ],
    documents: [
      "Current passport",
      "Financial evidence",
      "Employment details",
      "Health examination (if required)",
      "Police clearance certificate",
      "Accommodation bookings",
    ],
    fees: [
      { type: "eVisitor (subclass 651)", amount: "Free" },
      { type: "ETA (subclass 601)", amount: "AUD $20" },
      { type: "Visitor Visa (subclass 600)", amount: "AUD $190" },
    ],
    tips: [
      "Apply for eVisitor if eligible — it's free",
      "Ensure your passport is machine-readable",
      "Have travel insurance ready",
      "Declare any health conditions honestly",
    ],
  },
  {
    slug: "schengen",
    name: "Schengen Area",
    flag: "🇪🇺",
    processing: "10-15 days",
    type: "Short Stay",
    description:
      "The Schengen visa grants access to 27 European countries with a single visa. We help you apply through the correct embassy and prepare a strong application.",
    requirements: [
      "Valid passport (3+ months beyond stay)",
      "Completed application form",
      "Two passport photos",
      "Travel medical insurance (€30,000 minimum)",
      "Proof of accommodation",
      "Flight reservation",
      "Financial proof",
    ],
    documents: [
      "Passport with 2 blank pages",
      "Travel insurance certificate",
      "Bank statements (last 3 months)",
      "Employer/sponsor letter",
      "Hotel bookings for entire stay",
      "Round-trip flight reservation",
      "Cover letter with travel purpose",
    ],
    fees: [
      { type: "Adult Short Stay", amount: "€80" },
      { type: "Children (6-12)", amount: "€40" },
      { type: "Children (under 6)", amount: "Free" },
    ],
    tips: [
      "Apply at the embassy of your main destination",
      "Book refundable flights for the application",
      "Get insurance covering all Schengen states",
      "Apply 15 days to 6 months before travel",
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    processing: "5-7 days",
    type: "Tourist Visa",
    description:
      "Japan's tourist visa process is straightforward for most nationalities. We ensure your documentation meets the strict Japanese embassy standards.",
    requirements: [
      "Valid passport",
      "Visa application form",
      "Photo (4.5cm x 4.5cm)",
      "Schedule of stay",
      "Proof of financial means",
      "Flight reservation",
    ],
    documents: [
      "Passport with 6+ months validity",
      "Daily schedule/itinerary",
      "Bank certificate and statements",
      "Employment certificate",
      "Hotel reservations",
      "Guarantee letter (if applicable)",
    ],
    fees: [
      { type: "Single Entry", amount: "Free*" },
      { type: "Multiple Entry", amount: "Free*" },
      { type: "Transit Visa", amount: "Free*" },
    ],
    tips: [
      "Japan visa is free for many nationalities",
      "Submit a detailed daily itinerary",
      "Apply through accredited travel agency",
      "Processing times may vary by embassy",
    ],
  },
];
