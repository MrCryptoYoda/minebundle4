export interface SavedSearch {
  id: string;
  name: string;
  query: string; // e.g., "Gold in Australia"
  filters: Record<string, any>; // e.g., { commodity: 'Gold', location: 'Australia' }
  emailAlerts: boolean;
  lastRun?: string;
  resultsCount?: number;
}

export const mockSavedSearches: SavedSearch[] = [
  {
    id: 'ss-001',
    name: 'Gold Projects in WA',
    query: 'Gold Western Australia',
    filters: { commodity: 'Gold', location: 'Western Australia', stage: 'Development' },
    emailAlerts: true,
    lastRun: new Date().toISOString(),
    resultsCount: 12,
  },
  {
    id: 'ss-002',
    name: 'Copper Exploration',
    query: 'Copper exploration projects',
    filters: { commodity: 'Copper', stage: 'Exploration' },
    emailAlerts: false,
    lastRun: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    resultsCount: 5,
  },
  {
    id: 'ss-003',
    name: 'Lithium under $50M',
    query: 'Lithium projects < 50M',
    filters: { commodity: 'Lithium', priceMax: 50000000 },
    emailAlerts: true,
    lastRun: new Date(Date.now() - 86400000 * 7).toISOString(), // 1 week ago
    resultsCount: 3,
  },
];

// Mock global setting for notification tie-in
export const mockGlobalNotificationSettings = {
  savedSearchesEnabled: true,
};
