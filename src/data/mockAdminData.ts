
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Individual' | 'Agent' | 'Service Provider' | 'Admin';
  dateJoined: string;
  status: 'Active' | 'Disabled';
}

export interface AdminProject {
  id: string;
  name: string;
  listedBy: string;
  location: string;
  commodity: string;
  intention: 'Sale' | 'JV' | 'Offtake';
  dateListed: string;
  status: 'Live' | 'Draft' | 'Sold' | 'Rejected' | 'Pending Approval';
  agreementStatus: 'Signed' | 'Pending' | 'Not Sent';
}

export interface AdminArbitration {
  id: string;
  claimName: string;
  type: 'Contract' | 'Commercial' | 'Treaty';
  sector: string;
  intention: 'Funding' | 'Sale';
  dateListed: string;
  status: 'Live' | 'Pending Approval' | 'Rejected';
  agreementStatus: 'Signed' | 'Pending';
}

export interface AdminNDA {
  id: string;
  projectName: string;
  buyerName: string;
  sellerName: string;
  dateSigned: string;
}

export interface AdminEnquiry {
  id: string;
  userName: string;
  projectName: string;
  projectOwner: string;
  terms: boolean;
  price: boolean;
  moreInfo: boolean;
  description: string;
  enquiredAt: string;
}

export interface CapitalRequirement {
  id: string;
  companyName: string;
  agentName: string;
  email: string;
  location: string;
}

export interface AdminQuestion {
  id: string;
  text: string;
  type: 'Text' | 'YesNo' | 'Select' | 'MultiSelect' | 'FileUpload';
  step: string;
  section: string;
  required: boolean;
}

export interface AdminSection {
  id: string;
  name: string;
  flow: 'Project' | 'Arbitration';
  order: number;
}

// Mock Data

export const MOCK_ADMIN_USERS: AdminUser[] = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'Individual', dateJoined: '2025-01-15', status: 'Active' },
  { id: 'u2', name: 'Sarah Smith', email: 'sarah@broker.com', role: 'Agent', dateJoined: '2025-02-01', status: 'Active' },
  { id: 'u3', name: 'Acme Services', email: 'contact@acme.com', role: 'Service Provider', dateJoined: '2025-02-10', status: 'Active' },
  { id: 'u4', name: 'Bad Actor', email: 'bad@actor.com', role: 'Individual', dateJoined: '2025-02-20', status: 'Disabled' },
];

export const MOCK_ADMIN_PROJECTS: AdminProject[] = [
  { id: 'p1', name: 'Pilbara Gold', listedBy: 'Sarah Smith', location: 'WA, Australia', commodity: 'Gold', intention: 'Sale', dateListed: '2025-02-20', status: 'Live', agreementStatus: 'Signed' },
  { id: 'p2', name: 'Nevada Lithium', listedBy: 'John Doe', location: 'Nevada, USA', commodity: 'Lithium', intention: 'JV', dateListed: '2025-02-22', status: 'Pending Approval', agreementStatus: 'Signed' },
  { id: 'p3', name: 'Copper Mountain', listedBy: 'Mike Jones', location: 'Chile', commodity: 'Copper', intention: 'Sale', dateListed: '2025-02-18', status: 'Rejected', agreementStatus: 'Not Sent' },
  { id: 'p4', name: 'Rare Earths Project', listedBy: 'Sarah Smith', location: 'Greenland', commodity: 'REE', intention: 'Offtake', dateListed: '2025-02-25', status: 'Draft', agreementStatus: 'Pending' },
];

export const MOCK_ADMIN_ARBITRATION: AdminArbitration[] = [
  { id: 'a1', claimName: 'State vs Mining Co', type: 'Treaty', sector: 'Gold', intention: 'Funding', dateListed: '2025-01-10', status: 'Live', agreementStatus: 'Signed' },
  { id: 'a2', claimName: 'Contract Breach #44', type: 'Contract', sector: 'Construction', intention: 'Sale', dateListed: '2025-02-15', status: 'Pending Approval', agreementStatus: 'Signed' },
];

export const MOCK_ADMIN_NDAS: AdminNDA[] = [
  { id: 'n1', projectName: 'Pilbara Gold', buyerName: 'InvestCorp', sellerName: 'Sarah Smith', dateSigned: '2025-02-21' },
  { id: 'n2', projectName: 'Nevada Lithium', buyerName: 'TechGiant', sellerName: 'John Doe', dateSigned: '2025-02-23' },
];

export const MOCK_ADMIN_ENQUIRIES: AdminEnquiry[] = [
  { id: 'e1', userName: 'InvestCorp', projectName: 'Pilbara Gold', projectOwner: 'Sarah Smith', terms: true, price: true, moreInfo: false, description: 'Interested in term sheet.', enquiredAt: '2025-02-21' },
  { id: 'e2', userName: 'TechGiant', projectName: 'Nevada Lithium', projectOwner: 'John Doe', terms: false, price: false, moreInfo: true, description: 'Send geological reports.', enquiredAt: '2025-02-24' },
];

export const MOCK_CAPITAL_REQS: CapitalRequirement[] = [
  { id: 'c1', companyName: 'Global Fund', agentName: 'Alice Wong', email: 'alice@fund.com', location: 'Singapore' },
  { id: 'c2', companyName: 'Mining Cap', agentName: 'Bob Brown', email: 'bob@miningcap.com', location: 'London' },
];

export const MOCK_QUESTIONS: AdminQuestion[] = [
  { id: 'q1', text: 'Project Name', type: 'Text', step: 'Step 1', section: 'Property Details', required: true },
  { id: 'q2', text: 'Commodity', type: 'Select', step: 'Step 1', section: 'Property Details', required: true },
  { id: 'q3', text: 'JORC Compliant?', type: 'YesNo', step: 'Step 2', section: 'Reserves', required: true },
];

export const MOCK_SECTIONS: AdminSection[] = [
  { id: 's1', name: 'Property Details', flow: 'Project', order: 1 },
  { id: 's2', name: 'Reserves', flow: 'Project', order: 2 },
];
