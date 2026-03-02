import { addDays, subDays } from 'date-fns';
import { COMMODITY_TAXONOMY } from './commodityTaxonomy';
import { LOCATION_TAXONOMY } from './locationTaxonomy';

export interface Listing {
  id: string;
  title: string;
  type: 'Mining Project' | 'Renewable Asset' | 'Claim' | 'Royalty Asset' | 'Offtake Listing';
  commodity: string[];
  location: {
    country: string;
    region: string;
    coordinates?: [number, number];
  };
  stage: 'Exploration' | 'Development' | 'Production' | 'Care & Maintenance' | 'Closed';
  price: {
    amount: number | null;
    currency: string;
    type: 'Fixed' | 'Negotiable' | 'Auction' | 'Contact for Price';
  };
  intention?: string; // e.g., 'Product Sale', 'Farm-in', 'Joint Venture'
  image: string;
  summary: string;
  highlights: string[];
  isFeatured?: boolean;
  isNdaRequired?: boolean;
  createdAt: Date;
  matchReason?: string;
  seller: {
    name: string;
    type: 'Individual' | 'Agent' | 'Company';
    avatar?: string;
    companyName?: string;
    companyType?: 'Public' | 'Private';
    ownership?: string;
    isOperatorHidden?: boolean;
  };
  // General details
  geology?: string;
  resource?: string;
  infrastructure?: string;
  // Offtake specific
  offtakeDetails?: {
    intention: 'Product Sale';
    grade: string;
    quantity: string;
    contractType: 'Spot' | 'Long Term';
  };
  
  // Data Room
  dataRoom?: {
    files: Array<{
      name: string;
      category: 'Presentation' | 'Resource Reports' | 'Maps' | 'Technical Reports' | 'Photos' | 'Other';
      type: 'PDF' | 'XLSX' | 'CSV' | 'ZIP' | 'DOCX' | 'JPG';
      size: string;
      date: string;
    }>;
  };

  // New Wizard Fields
  commoditySector?: string[];
  explorationHighlights?: string;
  tenementLocationMaps?: boolean;
  drillRockChipMap?: boolean;
  crossSectionIsometric?: boolean;
  corePhotos?: boolean;
  samplePhotos?: boolean;
  additionalImagery?: boolean;
  companyStatus?: 'Private' | 'Public';
  operatorName?: string;
  currentOwnership?: string;
  jorcCompliant?: string;
  uploadDocumentalFile?: boolean;
  additionalResourceInfo?: string;
  uploadSupportingDoc?: boolean;
  tonnageVolume?: boolean;
  resourceContainedGrade?: boolean;
  sizeOfArea?: string;
  numberOfClaims?: boolean;
  drillingPermits?: boolean;
  uploadPresentation?: boolean;
  recentAnnouncement?: boolean;
  materialInfrastructure?: string;
  nativeTitleAgreements?: boolean;
  royaltyDetails?: boolean;
  yearlyRentalFees?: string;
  rentalFeesPaid?: boolean;
}

export const COMMODITIES = [
  'Gold', 'Copper', 'Lithium', 'Silver', 'Nickel', 'Cobalt', 'Zinc', 'Iron Ore', 'Rare Earths', 'Uranium'
];

export const LOCATIONS = [
  { country: 'Australia', region: 'Western Australia' },
  { country: 'Canada', region: 'British Columbia' },
  { country: 'USA', region: 'Nevada' },
  { country: 'Chile', region: 'Antofagasta' },
  { country: 'Peru', region: 'Cajamarca' },
  { country: 'Brazil', region: 'Minas Gerais' },
];

// --- GENERATOR LOGIC ---

const PROJECT_TYPES = ['Mining Project', 'Claim', 'Royalty Asset', 'Offtake Listing'] as const;
const STAGES = ['Exploration', 'Development', 'Production', 'Care & Maintenance'] as const;
const INTENTIONS = ['Joint Venture', 'Asset Sale', 'Farm-in', 'Royalty Sale', 'Product Sale'];
const SELLER_TYPES = ['Company', 'Agent', 'Individual'] as const;

const ADJECTIVES = ['High-Grade', 'Strategic', 'Large-Scale', 'Advanced', 'Promising', 'Historic', 'Expandable', 'Premium', 'Underexplored', 'Tier-1'];
const NOUNS = ['Project', 'Asset', 'Opportunity', 'Deposit', 'Mine', 'Tenement', 'Operation', 'Holdings'];

export const IMAGES = [
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/albert-hyseni-jH9eDAc35jw-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/artists-eyes-TV2FoJrzUHo-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/badibanga-roger-rCeBNTHDEHk-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/boom-bucket-Ua0tem2F3dA-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/ingo-doerrie-bQ0FtTrcwwI-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/jan-hrdlicka-HFtjk0O9FCI-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/japhet-khendlo-jhV02moWVWo-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/rs-portjanow-yz9HkvfvKbA-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/leonie-clough-CH2yRJCocRg-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/markus-kammermann-k51jyAgVlQw-unsplash.webp",
  "https://pub-8fbdabcb7c874830af8edc90d34fa166.r2.dev/sven-eisenschmidt-aPSg3zv1dYE-unsplash.webp"
];

const generateListings = (): Listing[] => {
  const listings: Listing[] = [];
  const allCommodities = COMMODITY_TAXONOMY.flatMap(s => s.commodities);
  const allCountries = LOCATION_TAXONOMY.flatMap(r => r.countries);
  
  let idCounter = 1;

  // Ensure at least 10 listings per commodity
  allCommodities.forEach((comm, commIndex) => {
    for (let i = 0; i < 12; i++) {
      // Cyclically assign countries to ensure distribution
      // Use a prime number offset or just simple index math to scramble it a bit relative to commodities
      const countryIndex = (commIndex * 12 + i) % allCountries.length;
      const country = allCountries[countryIndex];
      
      // Pick a random subregion if available, else use a generic one
      const region = country.subregions && country.subregions.length > 0
        ? country.subregions[i % country.subregions.length].name
        : country.name; // Fallback to country name if no subregion

      const type = PROJECT_TYPES[i % PROJECT_TYPES.length];
      const stage = STAGES[i % STAGES.length];
      const adjective = ADJECTIVES[i % ADJECTIVES.length];
      const noun = NOUNS[i % NOUNS.length];
      
      const title = `${adjective} ${comm.name} ${noun} in ${region}`;
      
      listings.push({
        id: `lst_${String(idCounter++).padStart(3, '0')}`,
        title: title,
        type: type,
        commodity: [comm.name],
        location: {
          country: country.name,
          region: region
        },
        stage: stage,
        price: {
          amount: Math.random() > 0.3 ? Math.floor(Math.random() * 50000000) + 100000 : null,
          currency: 'USD',
          type: Math.random() > 0.5 ? 'Negotiable' : 'Contact for Price'
        },
        intention: INTENTIONS[i % INTENTIONS.length],
        image: IMAGES[(idCounter + i) % IMAGES.length], // Use new images cyclically
        summary: `An exceptional ${stage.toLowerCase()} stage ${comm.name.toLowerCase()} opportunity located in the prolific ${region} belt. This asset offers significant upside potential with existing infrastructure nearby.`,
        highlights: [
          `${comm.name} Mineralization`,
          `${stage} Stage`,
          `Located in ${country.name}`,
          'Strong Upside Potential'
        ],
        isFeatured: i % 5 === 0, // 20% featured
        isNdaRequired: i % 3 === 0, // 33% NDA
        createdAt: subDays(new Date(), Math.floor(Math.random() * 30)),
        seller: {
          name: `Seller ${idCounter}`,
          type: SELLER_TYPES[i % SELLER_TYPES.length],
          companyName: `${comm.name} Resources Ltd`,
          companyType: 'Public',
          ownership: '100% Owned'
        },
        dataRoom: {
          files: [
            { name: 'Project Teaser.pdf', category: 'Presentation', type: 'PDF', size: '2.4 MB', date: '2025-01-15' },
            { name: 'Technical Report.pdf', category: 'Technical Reports', type: 'PDF', size: '15.8 MB', date: '2024-11-20' }
          ]
        }
      });
    }
  });

  return listings;
};

export const MOCK_LISTINGS: Listing[] = generateListings();

export const MOCK_SERVICES = [
  {
    id: 'srv_001',
    name: 'GeoScan Exploration Services',
    category: 'Exploration & Geology',
    location: ['Australia', 'Africa'],
    image: IMAGES[0],
    description: 'Advanced geophysical surveying and geological mapping services.',
    verified: true
  },
  {
    id: 'srv_002',
    name: 'MineBuild Engineering',
    category: 'Mine Infrastructure',
    location: ['Global'],
    image: IMAGES[1],
    description: 'EPCM services for mine construction and infrastructure development.',
    verified: true
  },
  {
    id: 'srv_003',
    name: 'EcoRehab Solutions',
    category: 'Rehabilitation & Closure',
    location: ['North America'],
    image: IMAGES[2],
    description: 'Sustainable mine closure and environmental rehabilitation planning.',
    verified: false
  }
];

