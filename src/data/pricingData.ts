export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: string;
    annual: string;
  };
  features: string[];
  ctaText: string;
  badge?: string;
  isPopular?: boolean;
  isDisabled?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier1',
    name: 'Pro',
    description: 'Essential tools for service providers to find leads and track market signals.',
    price: {
      monthly: '$49',
      annual: '$39',
    },
    features: [
      'Unlimited Leads Feed',
      'Advanced Lead Filters',
      'Market Snapshots',
      'Save Custom Searches',
      'Email Alerts',
      'Provider Profile Badge',
    ],
    ctaText: 'Start Tier 1',
    badge: 'Most Popular',
    isPopular: true,
    isDisabled: false,
  },
  {
    id: 'tier2',
    name: 'Growth',
    description: 'Advanced intelligence and team workflows for growing agencies.',
    price: {
      monthly: '$99',
      annual: '$79',
    },
    features: [
      'Everything in Pro',
      'Team Members (up to 5)',
      'Export Leads to CSV',
      'Contact Tracking',
      'Priority Support',
      'Advanced Analytics',
    ],
    ctaText: 'Coming Soon',
    badge: 'Coming Soon',
    isDisabled: true,
  },
  {
    id: 'tier3',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations with specific needs.',
    price: {
      monthly: 'Contact',
      annual: 'Contact',
    },
    features: [
      'Everything in Growth',
      'Unlimited Team Members',
      'API Access',
      'Dedicated Account Manager',
      'Custom Integrations',
      'SLA Guarantees',
    ],
    ctaText: 'Talk to Sales',
    badge: 'Enterprise',
    isDisabled: true,
  },
];

export interface Feature {
  name: string;
  tiers: {
    tier1: boolean | string;
    tier2: boolean | string;
    tier3: boolean | string;
  };
}

export interface FeatureCategory {
  category: string;
  features: Feature[];
}

export const COMPARISON_FEATURES: FeatureCategory[] = [
  {
    category: 'Leads & Business Development',
    features: [
      { name: 'Leads for you feed', tiers: { tier1: true, tier2: true, tier3: true } },
      { name: 'Lead filters and saved views', tiers: { tier1: true, tier2: true, tier3: true } },
      { name: 'Contacted vs uncontacted tracking', tiers: { tier1: false, tier2: true, tier3: true } },
      { name: 'Export leads', tiers: { tier1: false, tier2: true, tier3: true } },
      { name: 'Alerts/notifications for new leads', tiers: { tier1: true, tier2: true, tier3: true } },
    ],
  },
  {
    category: 'Market Intelligence',
    features: [
      { name: 'Trending commodities', tiers: { tier1: true, tier2: true, tier3: true } },
      { name: 'Top fundraisers', tiers: { tier1: true, tier2: true, tier3: true } },
      { name: 'Latest news feed', tiers: { tier1: true, tier2: true, tier3: true } },
      { name: 'Market snapshots widgets', tiers: { tier1: true, tier2: true, tier3: true } },
    ],
  },
  {
    category: 'Premium Signals',
    features: [
      { name: 'Funding raise signals', tiers: { tier1: false, tier2: true, tier3: true } },
      { name: 'Stage change signals', tiers: { tier1: false, tier2: true, tier3: true } },
      { name: 'New license signals', tiers: { tier1: false, tier2: true, tier3: true } },
      { name: 'Custom watchlists', tiers: { tier1: true, tier2: true, tier3: true } },
    ],
  },
  {
    category: 'Team & Workflow',
    features: [
      { name: 'Approved team members', tiers: { tier1: '1 User', tier2: 'Up to 5', tier3: 'Unlimited' } },
      { name: 'Permissions', tiers: { tier1: false, tier2: true, tier3: true } },
      { name: 'Provider profile integration', tiers: { tier1: true, tier2: true, tier3: true } },
    ],
  },
];

export const VALUE_BLOCKS = [
  {
    title: 'Find opportunities faster',
    description: 'Get matched with relevant projects instantly based on your service expertise.',
    icon: 'Search',
  },
  {
    title: 'Stay ahead of market signals',
    description: 'Track funding rounds, stage changes, and new licenses as they happen.',
    icon: 'TrendingUp',
  },
  {
    title: 'Convert leads into enquiries',
    description: 'Directly connect with project owners who are actively looking for services.',
    icon: 'MessageSquare',
  },
  {
    title: 'Track what matters',
    description: 'Monitor specific commodities, regions, and companies relevant to your business.',
    icon: 'Target',
  },
];

export const FAQS = [
  {
    question: 'Who is Insights for?',
    answer: 'Insights is designed specifically for Mining Service Providers (consultants, contractors, suppliers) who want to find new business opportunities and stay informed about market activities.',
  },
  {
    question: 'What is a Service Provider account?',
    answer: 'A Service Provider account allows you to list your services on the marketplace and access the Insights dashboard. It is distinct from individual investor or broker accounts.',
  },
  {
    question: 'How do leads work?',
    answer: 'Our system analyzes project listings and activities to identify potential needs for services. These are presented as "Leads" in your dashboard, filtered by your expertise.',
  },
  {
    question: 'Can I cancel?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
  },
  {
    question: 'Do I need to sign NDAs?',
    answer: 'Accessing detailed project information often requires signing an NDA. Our platform facilitates this process digitally to build trust between providers and project owners.',
  },
  {
    question: "What's coming in Tier 2/3?",
    answer: 'Future tiers will include advanced features like team collaboration tools, CRM-style lead tracking, export capabilities, and deeper market intelligence signals.',
  },
];
