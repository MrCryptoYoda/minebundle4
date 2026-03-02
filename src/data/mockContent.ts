import { IMAGES } from './mockData';

export interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  fileType: "PDF";
  pages?: number;
  updatedAt: string;
  thumbnail: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  duration: string;
  publishedAt: string;
  thumbnail: string;
  featured?: boolean;
}

export const MOCK_GUIDES: Guide[] = [
  {
    id: "g1",
    title: "The Ultimate Guide to Selling Mining Assets",
    description: "A comprehensive walkthrough of the listing process, valuation, and closing deals.",
    category: "For Sellers",
    tags: ["Listing", "Valuation"],
    fileType: "PDF",
    pages: 12,
    updatedAt: "2024-01-15",
    thumbnail: IMAGES[0]
  },
  {
    id: "g2",
    title: "Navigating NDAs and Data Rooms",
    description: "Best practices for managing confidentiality and sharing sensitive data.",
    category: "NDAs & Confidentiality",
    tags: ["Legal", "Security"],
    fileType: "PDF",
    pages: 8,
    updatedAt: "2024-02-01",
    thumbnail: IMAGES[1]
  },
  {
    id: "g3",
    title: "Due Diligence Checklist for Buyers",
    description: "Essential steps to validate technical, financial, and legal aspects of a project.",
    category: "Due Diligence",
    tags: ["Buying", "Risk"],
    fileType: "PDF",
    pages: 15,
    updatedAt: "2023-12-10",
    thumbnail: IMAGES[2]
  },
  {
    id: "g4",
    title: "Agent Commission Structures Explained",
    description: "Understanding standard fee models and facilitation agreements.",
    category: "For Agents",
    tags: ["Commission", "Agreements"],
    fileType: "PDF",
    pages: 6,
    updatedAt: "2024-01-20",
    thumbnail: IMAGES[3]
  },
  {
    id: "g5",
    title: "Structuring Royalty & Offtake Deals",
    description: "Alternative financing models for mining projects.",
    category: "Deal Structures",
    tags: ["Finance", "Royalties"],
    fileType: "PDF",
    pages: 10,
    updatedAt: "2024-02-15",
    thumbnail: IMAGES[4]
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Market Outlook 2024: Critical Minerals",
    description: "Expert analysis on the supply and demand trends for lithium, copper, and nickel.",
    category: "Market Insights",
    tags: ["Trends", "Forecast"],
    duration: "15:30",
    publishedAt: "2024-01-05",
    thumbnail: IMAGES[5],
    featured: true
  },
  {
    id: "v2",
    title: "Platform Walkthrough: Creating a Listing",
    description: "Step-by-step guide to publishing your first asset on Minexchange.",
    category: "Platform Walkthrough",
    tags: ["Tutorial", "Sellers"],
    duration: "08:45",
    publishedAt: "2023-11-20",
    thumbnail: IMAGES[6]
  },
  {
    id: "v3",
    title: "Interview: The Future of Green Steel",
    description: "Discussion with industry leaders on decarbonization and iron ore.",
    category: "Interviews",
    tags: ["Sustainability", "Iron Ore"],
    duration: "22:10",
    publishedAt: "2024-02-10",
    thumbnail: IMAGES[7]
  },
  {
    id: "v4",
    title: "Dealmaking Masterclass: Valuation",
    description: "How to value early-stage exploration projects.",
    category: "Dealmaking",
    tags: ["Valuation", "Finance"],
    duration: "12:00",
    publishedAt: "2024-01-25",
    thumbnail: IMAGES[8]
  },
  {
    id: "v5",
    title: "Commodity Focus: Gold in West Africa",
    description: "Deep dive into the geology and investment climate of the region.",
    category: "Commodity Focus",
    tags: ["Gold", "Africa"],
    duration: "18:20",
    publishedAt: "2023-12-05",
    thumbnail: IMAGES[9]
  }
];
