
export interface InsightLead {
  id: string;
  title: string;
  summary: string;
  company: string;
  category: string;
  region: string;
  commodity: string;
  stage: string;
  recency: string; // e.g., "2 days ago"
  matchReason: string;
  isContacted: boolean;
  isSaved: boolean;
  matchScore: number;
  tags: string[];
  impliedWorkCategories: string[];
}

export interface MarketSignal {
  id: string;
  type: 'funding' | 'stage_change' | 'license' | 'news';
  title: string;
  description: string;
  date: string;
  entity: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
}

export const MOCK_LEADS: InsightLead[] = [
  {
    id: '1',
    title: 'Account Preserves Operations Update for January 2023 in the Development of The Sleeping Giant Gold Mine',
    summary: 'Seeking RC drilling services for a 5,000m campaign starting Q3 2026. Site accessible via Newman.',
    company: 'Red Earth Minerals',
    category: 'Drilling & Blasting',
    region: 'Western Australia',
    commodity: 'Gold',
    stage: 'Exploration',
    recency: 'Posted 2 days ago',
    matchReason: 'Matches your "RC Drilling" and "WA" service tags',
    isContacted: false,
    isSaved: false,
    matchScore: 87,
    tags: ['Western Australia', 'Active', 'Development', 'Gold'],
    impliedWorkCategories: ['RC Drilling', 'Soil Sampling', 'Geophysics', 'Surface Geochemistry']
  },
  {
    id: '2',
    title: 'Sale of Mining and Exploration Tenement Trem at GLD Processing Plant (Yas)',
    summary: 'Full EIS required for brownfields copper expansion. Flora/fauna surveys completed.',
    company: 'CopperMountain Res',
    category: 'HSE, Risk & ESG',
    region: 'Arizona, USA',
    commodity: 'Copper',
    stage: 'Feasibility',
    recency: 'Posted 4 days ago',
    matchReason: 'Matches your "Environmental Consulting" service',
    isContacted: true,
    isSaved: true,
    matchScore: 93,
    tags: ['Western Australia', 'Active', 'Development', 'Gold'],
    impliedWorkCategories: ['RC Drilling', 'Dseencel Onting', 'Geophysics', 'Soil Sampling']
  },
  {
    id: '3',
    title: 'Olex-ax High-Grade Vivien Gold Project',
    summary: 'PFS level mine design and scheduling for high-grade narrow vein deposit.',
    company: 'Silver Peak Mining',
    category: 'Mine Planning',
    region: 'Mexico',
    commodity: 'Silver',
    stage: 'Pre-Feasibility',
    recency: 'Posted 1 week ago',
    matchReason: 'High relevance to your "Mine Engineering" profile',
    isContacted: false,
    isSaved: false,
    matchScore: 79,
    tags: ['Western Australia', 'Gold', 'Development', 'Gold'],
    impliedWorkCategories: ['RC Drilling', 'Geophysics', 'Metallurgy', 'Drilling Support']
  },
  {
    id: '4',
    title: 'Camp Construction & Management Tender',
    summary: 'Turnkey 200-person camp solution needed for remote lithium project.',
    company: 'Green Energy Metals',
    category: 'Mine Infrastructure',
    region: 'Quebec, Canada',
    commodity: 'Lithium',
    stage: 'Development',
    recency: 'Posted 5 days ago',
    matchReason: 'Matches "Infrastructure" category',
    isContacted: false,
    isSaved: false,
    matchScore: 65,
    tags: ['Quebec', 'Active', 'Development', 'Lithium'],
    impliedWorkCategories: ['Construction', 'Camp Management', 'Logistics']
  },
  {
    id: '5',
    title: 'Geochemical Assay Lab Services',
    summary: 'Long-term contract for onsite sample prep and offsite assay turnaround.',
    company: 'Frontier Gold',
    category: 'Exploration & Geology',
    region: 'Nevada, USA',
    commodity: 'Gold',
    stage: 'Production',
    recency: 'Posted 1 week ago',
    matchReason: 'Matches "Geochemistry" capability',
    isContacted: false,
    isSaved: false,
    matchScore: 82,
    tags: ['Nevada', 'Active', 'Production', 'Gold'],
    impliedWorkCategories: ['Assay', 'Lab Services', 'Geochemistry']
  }
];

export const MOCK_SIGNALS: MarketSignal[] = [
  {
    id: 's1',
    type: 'funding',
    title: 'Raised $15M for Drilling',
    description: 'Red Earth Minerals closed Series B to fund Pilbara expansion.',
    date: 'Today',
    entity: 'Red Earth Minerals'
  },
  {
    id: 's2',
    type: 'stage_change',
    title: 'Moved to PFS Stage',
    description: 'Silver Peak Mining advanced their flagship project after positive scoping.',
    date: 'Yesterday',
    entity: 'Silver Peak Mining'
  },
  {
    id: 's3',
    type: 'license',
    title: 'New Exploration License Granted',
    description: 'EL45/1234 granted to Northern Star Resources in Kalgoorlie region.',
    date: '2 days ago',
    entity: 'Northern Star'
  },
  {
    id: 's4',
    type: 'funding',
    title: '$50M IPO Completed',
    description: 'Lithium Future Corp listed on ASX today.',
    date: '3 days ago',
    entity: 'Lithium Future Corp'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', title: 'Gold hits record high amid global uncertainty', source: 'Mining Weekly', timeAgo: '4h ago' },
  { id: 'n2', title: 'New regulations for tailings management in Brazil', source: 'Mining.com', timeAgo: '6h ago' },
  { id: 'n3', title: 'Tech trends: AI in mineral processing', source: 'Engineering News', timeAgo: '12h ago' },
  { id: 'n4', title: 'Copper supply deficit forecast to widen', source: 'Bloomberg', timeAgo: '1d ago' },
  { id: 'n5', title: 'Major merger announced in lithium sector', source: 'Reuters', timeAgo: '2d ago' }
];

export const MOCK_FUNDRAISERS = [
  { name: 'Horean Minerals', amount: '$40.00M' },
  { name: 'NX Gold Resources', amount: '$43.12M' },
  { name: 'Northern Minerals', amount: '$29.95M' },
  { name: 'Shanta Gold Limited', amount: '$26.16M' },
];

export const MOCK_TRENDING_COMMODITIES = [
  { name: 'Gold', price: '$2,341.60', change: '+1.2%', capital: '$185M', trend: 'up' },
  { name: 'Uranium', price: '$91.25 lb', change: '-1.8%', capital: '$41M', trend: 'down' },
  { name: 'Copper', price: '$4.57 lb', change: '+0.7%', capital: '$38M', trend: 'up' },
  { name: 'Nickel', price: '$7.76 lb', change: '-4.6%', capital: '$21M', trend: 'down' },
  { name: 'Silver', price: '$28.14 oz', change: '-2.9%', capital: '$9M', trend: 'down' },
  { name: 'Lithium', price: '$16.50 lb', change: '-2.9%', capital: '$93M', trend: 'down' },
  { name: 'Zinc', price: '$1.21 lb', change: '+3.7%', capital: '$10M', trend: 'up' },
  { name: 'Iron Ore', price: '$115.24 T', change: '+5.7%', capital: '$56M', trend: 'up' },
];
