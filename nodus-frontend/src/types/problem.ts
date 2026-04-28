export type FeedProblemStatus = 'open' | 'in-progress' | 'completed' | 'closed';

export interface FeedProblem {
  id: string;
  title: string;
  description: string;
  company: string;
  companyType: string;
  category: string;
  bounty: number;
  status: FeedProblemStatus;
  badge?: string;
  responses: number;
  postedAt: string;
  avatar?: string;
}

export type ProblemStatus = 'open' | 'hiring' | 'closed';

export interface ProblemTag {
  stack: string[];
  complexity: string;
}

export interface ProblemAuthor {
  _id?: string;
  name?: string;
  title?: string;
  companyName?: string;
  avatarUrl?: string;
  reputationScore?: number;
}

export interface ProblemCommentAuthor {
  _id?: string;
  name?: string;
  title?: string;
  avatarUrl?: string;
}

export interface ProblemComment {
  _id: string;
  comment: string;
  likes: number;
  createdBy: string;
  createdByName?: string;
  createdByTitle?: string;
  createdAt?: string;
}

export interface FreeSolution {
  _id: string;
  title: string;
  description: string;
  link?: string;
  submittedBy: string;
  submittedByName?: string;
  submittedByTitle?: string;
  createdAt?: string;
  problemId: string;
  problemTitle?: string;
}

export interface ProblemDetail {
  _id: string;
  title: string;
  desc: string;
  tags: ProblemTag[];
  difficulty: string;
  status: ProblemStatus;
  createdBy: string;
  createdAt: string;
  applicationDeadline: string;
  AIAnalysis: string;
  freeSolutions: FreeSolution[];
  comments: ProblemComment[];
  commentsCount: number;
  author?: ProblemAuthor;
}

export type Problem = ProblemDetail;
