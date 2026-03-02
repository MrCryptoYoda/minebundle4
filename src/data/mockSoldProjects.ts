import { Listing, IMAGES } from './mockData';
import { subDays, subMonths } from 'date-fns';

export interface SoldProject extends Listing {
  soldDate: Date;
}

export const MOCK_SOLD_PROJECTS: SoldProject[] = [
  {
    id: 'sold_001',
    title: 'Historic Copper Mine',
    type: 'Mining Project',
    commodity: ['Copper', 'Gold'],
    location: { country: 'Chile', region: 'Atacama' },
    stage: 'Care & Maintenance',
    price: { amount: 4500000, currency: 'USD', type: 'Fixed' },
    image: IMAGES[5],
    summary: 'Historic mine with existing infrastructure. Sold to mid-tier operator.',
    highlights: ['Infrastructure in place', 'Historic resource'],
    createdAt: subMonths(new Date(), 6),
    soldDate: subDays(new Date(), 15),
    seller: { name: 'Global Mining Corp', type: 'Company' }
  },
  {
    id: 'sold_002',
    title: 'Lithium Exploration Tenements',
    type: 'Claim',
    commodity: ['Lithium'],
    location: { country: 'Australia', region: 'Western Australia' },
    stage: 'Exploration',
    price: { amount: 850000, currency: 'AUD', type: 'Negotiable' },
    image: IMAGES[6],
    summary: 'Strategic tenement package in emerging lithium district.',
    highlights: ['Strategic location', 'High potential'],
    createdAt: subMonths(new Date(), 4),
    soldDate: subMonths(new Date(), 1),
    seller: { name: 'Sarah Jenkins', type: 'Agent' }
  }
];
