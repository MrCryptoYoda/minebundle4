import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProfileState {
  // Section A: Identity
  companyName: string;
  website: string;
  hqCountry: string;
  hqState: string;
  logo: string | null;
  tradingName: string;
  description: string;
  linkedinUrl: string;
  contactEmail: string;
  contactPhone: string;
  companySize: string;
  yearEstablished: string;

  // Section B: Service Categories
  serviceCategories: string[];
  capabilityTags: string[];
  serviceDifferentiators: string;

  // Section C: Commodities
  commoditySectors: string[];
  commodities: string[];
  primaryCommodities: string[];

  // Section D: Coverage
  coverageMode: 'list' | 'map';
  coverageCountries: string[];
  coverageStates: string[];
  coverageNotes: string;
  serviceRadius: string;
  mobilizationDays: string;
  remoteWork: boolean;

  // Section E: Project Stage
  projectStages: string[];
  dealPreferences: string[];

  // Section F: Capacity
  projectCapacity: string;
  maxProjectValue: string;
  maxConcurrentProjects: string;
  teamSize: string;
  availability: string;
  responseTime: string;

  // Section G: Compliance
  certifications: string[];
  licensingNotes: string;
  insuranceCoverage: boolean;

  // Section H: Commercial
  contractSize: string;
  contractModels: string[];
  paymentTerms: string;
  currencies: string[];

  // Section I: Alerts
  emailAlerts: boolean;
  smsAlerts: boolean;
  alertFrequency: 'Instant' | 'Daily' | 'Weekly';
  signalTypes: string[];
  quietHoursStart: string;
  quietHoursEnd: string;
  timezone: string;

  // Section J: Team
  teamMembers: Array<{ id: string; name: string; email: string; role: 'Admin' | 'Member' }>;

  // Section K: Projects
  pastProjects: Array<{
    id: string;
    title: string;
    client: string;
    year: string;
    value: string;
    description: string;
  }>;

  // Actions
  updateField: (field: keyof ProfileState, value: any) => void;
  calculateCompleteness: () => number;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      // Defaults
      companyName: '',
      website: '',
      hqCountry: '',
      hqState: '',
      logo: null,
      tradingName: '',
      description: '',
      linkedinUrl: '',
      contactEmail: '',
      contactPhone: '',
      companySize: '',
      yearEstablished: '',

      serviceCategories: [],
      capabilityTags: [],
      serviceDifferentiators: '',

      commoditySectors: [],
      commodities: [],
      primaryCommodities: [],

      coverageMode: 'map',
      coverageCountries: [],
      coverageStates: [],
      coverageNotes: '',
      serviceRadius: '',
      mobilizationDays: '',
      remoteWork: false,

      projectStages: [],
      dealPreferences: [],

      projectCapacity: '',
      maxProjectValue: '',
      maxConcurrentProjects: '',
      teamSize: '',
      availability: 'Available now',
      responseTime: '<24h',

      certifications: [],
      licensingNotes: '',
      insuranceCoverage: false,

      contractSize: '',
      contractModels: [],
      paymentTerms: '',
      currencies: [],

      emailAlerts: true,
      smsAlerts: false,
      alertFrequency: 'Daily',
      signalTypes: [],
      quietHoursStart: '',
      quietHoursEnd: '',
      timezone: '',

      teamMembers: [],
      pastProjects: [],

      updateField: (field, value) => set({ [field]: value }),
      
      calculateCompleteness: () => {
        const s = get();
        let score = 0;
        let totalWeight = 0;

        // Helper to add weight
        const check = (condition: boolean, weight: number) => {
          totalWeight += weight;
          if (condition) score += weight;
        };

        // Section A: Identity (25%)
        check(!!s.companyName, 5);
        check(!!s.website, 5);
        check(!!s.hqCountry, 5);
        check(!!s.description, 5);
        check(!!s.logo, 5);

        // Section B: Services (10%)
        check(s.serviceCategories.length > 0, 10);
        
        // Section C: Commodities (10%)
        check(s.commodities.length > 0, 10);
        
        // Section D: Coverage (10%)
        check(s.coverageCountries.length > 0, 10);
        
        // Section K: Projects (10%)
        check(s.pastProjects.length > 0, 10);

        // Section E: Stage (5%)
        check(s.projectStages.length > 0, 5);
        
        // Section F: Capacity (5%)
        check(!!s.maxProjectValue, 5);
        
        // Section G: Compliance (5%)
        check(s.certifications.length > 0, 5);
        
        // Section H: Commercial (5%)
        check(s.contractModels.length > 0, 5);
        
        // Section I: Alerts (5%)
        check(!!s.alertFrequency, 5);
        
        // Section J: Team (5%)
        check(s.teamMembers.length > 0, 5);

        // Contact Info (5%)
        check(!!s.contactEmail || !!s.contactPhone, 5);

        return Math.min(100, Math.round(score));
      },
    }),
    {
      name: 'service-provider-profile',
    }
  )
);
