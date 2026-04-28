export interface Problem {
  id: string;
  title: string;
  description: string;
  company: string;
  companyType: string;
  category: string;
  bounty: number;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
  badge?: string;
  responses: number;
  postedAt: string;
  avatar?: string;
}
