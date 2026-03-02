export interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
    organization?: string;
  };
  recipient: {
    name: string;
    avatar?: string;
    organization?: string;
  };
  enquiry: {
    title: string;
    listingId: string;
    type: 'Mining Project' | 'Renewable Asset' | 'Claim' | 'Royalty Asset' | 'Offtake';
  };
  status: 'new' | 'read' | 'replied';
  timestamp: string; // ISO string
  content: string;
  details: {
    terms: boolean;
    price: boolean;
    furtherInfo: boolean;
  };
}

export const mockReceivedMessages: Message[] = [
  {
    id: 'msg-001',
    sender: {
      name: 'Sarah Jenkins',
      organization: 'Global Mining Corp',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
    recipient: {
      name: 'You',
    },
    enquiry: {
      title: 'Copper Mountain Project',
      listingId: 'lst-101',
      type: 'Mining Project',
    },
    status: 'new',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    content: "Hi, I'm interested in the Copper Mountain Project. Could you provide more details on the recent drilling results? We are looking to expand our portfolio in the region.",
    details: {
      terms: true,
      price: false,
      furtherInfo: true,
    },
  },
  {
    id: 'msg-002',
    sender: {
      name: 'David Chen',
      organization: 'Chen Investments',
      avatar: 'https://i.pravatar.cc/150?u=david',
    },
    recipient: {
      name: 'You',
    },
    enquiry: {
      title: 'Nevada Gold Claim',
      listingId: 'lst-102',
      type: 'Claim',
    },
    status: 'read',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    content: "Is this claim still available? We are very interested in the location relative to the nearby operating mine.",
    details: {
      terms: false,
      price: true,
      furtherInfo: false,
    },
  },
  {
    id: 'msg-003',
    sender: {
      name: 'Michael Ross',
      organization: 'Ross & Partners',
    },
    recipient: {
      name: 'You',
    },
    enquiry: {
      title: 'Lithium Brine Opportunity',
      listingId: 'lst-103',
      type: 'Mining Project',
    },
    status: 'replied',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    content: "We would like to discuss the terms of the earn-in agreement. Are you open to a call next week?",
    details: {
      terms: true,
      price: true,
      furtherInfo: true,
    },
  },
];

export const mockSentMessages: Message[] = [
  {
    id: 'msg-004',
    sender: {
      name: 'You',
    },
    recipient: {
      name: 'Elena Rodriguez',
      organization: 'Andes Exploration',
      avatar: 'https://i.pravatar.cc/150?u=elena',
    },
    enquiry: {
      title: 'Silver Stream Royalty',
      listingId: 'lst-201',
      type: 'Royalty Asset',
    },
    status: 'read',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    content: "I'm interested in learning more about the current production rates and the royalty calculation method.",
    details: {
      terms: false,
      price: false,
      furtherInfo: true,
    },
  },
  {
    id: 'msg-005',
    sender: {
      name: 'You',
    },
    recipient: {
      name: 'James Wilson',
      organization: 'Wilson Mining',
    },
    enquiry: {
      title: 'Queensland Coal Asset',
      listingId: 'lst-202',
      type: 'Mining Project',
    },
    status: 'read',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    content: "Is the data room available for this project yet? I've signed the NDA.",
    details: {
      terms: false,
      price: false,
      furtherInfo: true,
    },
  },
];
