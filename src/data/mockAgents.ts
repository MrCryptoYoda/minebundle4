
export interface Agent {
  id: string;
  name: string;
  company: string;
  avatar: string;
  location: string;
  regions: string[];
  commodities: string[];
  dealTypes?: string[];
  verified: boolean;
  stats?: {
    liveListings: number;
    soldProjects: number;
  };
  featured?: boolean;
  bio?: string;
}

export const MOCK_AGENTS: Agent[] = [
  {
    id: "a1",
    name: "Sarah Jenkins",
    company: "Global Mining Partners",
    avatar: "https://i.pravatar.cc/150?u=a1",
    location: "Perth, Australia",
    regions: ["Australia", "Africa"],
    commodities: ["Gold", "Copper", "Lithium"],
    dealTypes: ["Mining Project", "Joint Venture"],
    verified: true,
    stats: { liveListings: 12, soldProjects: 45 },
    featured: true,
    bio: "Senior agent with 15 years experience in WA gold assets."
  },
  {
    id: "a2",
    name: "David Chen",
    company: "Pacific Resources",
    avatar: "https://i.pravatar.cc/150?u=a2",
    location: "Vancouver, Canada",
    regions: ["North America", "South America"],
    commodities: ["Silver", "Zinc", "Lead"],
    dealTypes: ["Mining Project", "Royalty"],
    verified: true,
    stats: { liveListings: 8, soldProjects: 22 },
    featured: true
  },
  {
    id: "a3",
    name: "Elena Rodriguez",
    company: "Andean Capital",
    avatar: "https://i.pravatar.cc/150?u=a3",
    location: "Santiago, Chile",
    regions: ["South America"],
    commodities: ["Copper", "Lithium"],
    dealTypes: ["Mining Project"],
    verified: true,
    stats: { liveListings: 5, soldProjects: 18 },
    featured: true
  },
  {
    id: "a4",
    name: "Michael Ross",
    company: "Ross & Associates",
    avatar: "https://i.pravatar.cc/150?u=a4",
    location: "Toronto, Canada",
    regions: ["North America", "Africa"],
    commodities: ["Gold", "Diamonds"],
    dealTypes: ["M&A", "Mining Project"],
    verified: false,
    stats: { liveListings: 3, soldProjects: 8 }
  },
  {
    id: "a5",
    name: "James Smith",
    company: "London Mining Agents",
    avatar: "https://i.pravatar.cc/150?u=a5",
    location: "London, UK",
    regions: ["Europe", "Africa", "Middle East"],
    commodities: ["Base Metals", "Industrial Minerals"],
    dealTypes: ["Offtake", "Financing"],
    verified: true,
    stats: { liveListings: 15, soldProjects: 60 },
    featured: true
  },
  {
    id: "a6",
    name: "Aiko Tanaka",
    company: "Tokyo Resources",
    avatar: "https://i.pravatar.cc/150?u=a6",
    location: "Tokyo, Japan",
    regions: ["Asia", "Australia"],
    commodities: ["Rare Earths", "Battery Metals"],
    dealTypes: ["Offtake", "Joint Venture"],
    verified: true,
    stats: { liveListings: 6, soldProjects: 12 }
  }
];
