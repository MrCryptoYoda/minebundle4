export interface LeadChange {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  timestamp: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export interface Lead {
  id: string;
  title: string;
  company: string;
  ticker: string;
  exchange: string;
  region: string;
  commodity: string;
  stage: string;
  serviceCategories: string[];
  postedAt: string; // ISO string or relative time like "2h ago"
  docType: string; // "Announcement", "Presentation", etc.
  confidence: 'High' | 'Medium' | 'Low';
  aiSummary: string;
  whyThisLead: string;
  fitScore: number;
  urgency: 'Act now' | 'Monitor' | 'Long horizon';
  procurementReadiness: 'Now' | '30-90' | '90+';
  changes?: LeadChange[];
  status: 'new' | 'active' | 'contacted' | 'snoozed' | 'archived';
  hotStreak: boolean;
  isUpdatedSinceLastView: boolean;
  tags: string[];
}

export const MOCK_LEADS_DATA: Lead[] = [
  {
    id: '1',
    title: 'De Grey Mining announces $150M capital raise for Hemi Gold Project development',
    company: 'De Grey Mining',
    ticker: 'DEG',
    exchange: 'ASX',
    region: 'Western Australia',
    commodity: 'Gold',
    stage: 'Development',
    serviceCategories: ['Drilling', 'EPC', 'Camp Services'],
    postedAt: '2h ago',
    docType: 'Announcement',
    confidence: 'High',
    aiSummary: 'De Grey Mining has launched a fully underwritten $150M institutional placement to fund early works and ordering of long-lead items for the Hemi Gold Project. Definitive Feasibility Study (DFS) is imminent.',
    whyThisLead: 'Matches your RC drilling + WA coverage + gold exploration focus.',
    fitScore: 94,
    urgency: 'Act now',
    procurementReadiness: 'Now',
    status: 'new',
    hotStreak: true,
    isUpdatedSinceLastView: true,
    tags: ['Capital Raise', 'DFS Imminent'],
    changes: [
      {
        id: 'c1',
        field: 'Funding Status',
        oldValue: 'Unfunded',
        newValue: 'Fully Funded ($150M)',
        timestamp: '2h ago',
        confidence: 'High'
      }
    ]
  },
  {
    id: '2',
    title: 'Patriot Battery Metals defines new high-grade lithium zone at Corvette',
    company: 'Patriot Battery Metals',
    ticker: 'PMT',
    exchange: 'ASX',
    region: 'Quebec, Canada',
    commodity: 'Lithium',
    stage: 'Exploration',
    serviceCategories: ['Geophysics', 'Drilling'],
    postedAt: '5h ago',
    docType: 'Drilling Report',
    confidence: 'High',
    aiSummary: 'New drilling results confirm high-grade spodumene pegmatite extension. The company plans to mobilize 4 additional rigs for the winter campaign.',
    whyThisLead: 'High-value exploration campaign expanding rapidly. Needs winterized drilling equipment.',
    fitScore: 88,
    urgency: 'Act now',
    procurementReadiness: '30-90',
    status: 'active',
    hotStreak: true,
    isUpdatedSinceLastView: false,
    tags: ['High Grade', 'Winter Campaign']
  },
  {
    id: '3',
    title: 'NexGen Energy submits final EIS for Rook I Project',
    company: 'NexGen Energy',
    ticker: 'NXE',
    exchange: 'TSX',
    region: 'Saskatchewan',
    commodity: 'Uranium',
    stage: 'Permitting',
    serviceCategories: ['Environmental', 'Engineering'],
    postedAt: '1d ago',
    docType: 'Permitting',
    confidence: 'Medium',
    aiSummary: 'Submission of the final Environmental Impact Statement (EIS) marks a key milestone. Provincial approval expected within 6 months.',
    whyThisLead: 'Major project moving to construction phase soon. Early engagement for camp and logistics recommended.',
    fitScore: 76,
    urgency: 'Monitor',
    procurementReadiness: '90+',
    status: 'new',
    hotStreak: false,
    isUpdatedSinceLastView: false,
    tags: ['Permitting Milestone']
  },
  {
    id: '4',
    title: 'Rio Tinto approves $77M pre-feasibility study for Rhodes Ridge',
    company: 'Rio Tinto',
    ticker: 'RIO',
    exchange: 'ASX',
    region: 'Western Australia',
    commodity: 'Iron Ore',
    stage: 'PFS',
    serviceCategories: ['Engineering', 'Consulting'],
    postedAt: '3d ago',
    docType: 'Quarterly Report',
    confidence: 'High',
    aiSummary: 'Rio Tinto has approved funding for a PFS at Rhodes Ridge. The project is one of the world’s best undeveloped iron ore deposits.',
    whyThisLead: 'Tier 1 client moving project forward. Engineering and study partners being selected.',
    fitScore: 82,
    urgency: 'Monitor',
    procurementReadiness: '90+',
    status: 'snoozed',
    hotStreak: false,
    isUpdatedSinceLastView: true,
    tags: ['Tier 1', 'PFS Funding'],
    changes: [
      {
        id: 'c2',
        field: 'Stage',
        oldValue: 'Scoping',
        newValue: 'PFS',
        timestamp: '3d ago',
        confidence: 'High'
      }
    ]
  },
  {
    id: '5',
    title: 'Liontown Resources awards underground mining contract',
    company: 'Liontown Resources',
    ticker: 'LTR',
    exchange: 'ASX',
    region: 'Western Australia',
    commodity: 'Lithium',
    stage: 'Construction',
    serviceCategories: ['Mining Services'],
    postedAt: '4h ago',
    docType: 'Contract Award',
    confidence: 'High',
    aiSummary: 'Underground mining services contract awarded to Byrnecut. Focus shifts to plant commissioning.',
    whyThisLead: 'Major contract awarded, but opportunities remain for sub-contractors and site services.',
    fitScore: 65,
    urgency: 'Long horizon',
    procurementReadiness: 'Now',
    status: 'archived',
    hotStreak: false,
    isUpdatedSinceLastView: false,
    tags: ['Contract Award']
  }
];
