import type { Problem } from '../types';

const mockProblems: Problem[] = [
  {
    _id: 'problem-ethiopian-logistics-ai',
    title: 'Build an AI dispatch copilot for last-mile delivery in Addis Ababa',
    desc:
      'Delivery operators need a smarter way to assign riders, predict delays, and reroute around congestion. We need a prototype dashboard that helps coordinators reduce failed deliveries and idle time.',
    tags: [
      { stack: ['React', 'Node.js', 'Maps API'], complexity: 'medium' },
      { stack: ['Machine Learning', 'Operations'], complexity: 'high' },
    ],
    difficulty: 'Intermediate',
    status: 'open',
    createdBy: 'nodus-labs',
    createdAt: '2026-04-20T09:00:00.000Z',
    applicationDeadline: '2026-05-05T17:00:00.000Z',
    AIAnalysis:
      'A strong solution will combine route optimization, lightweight demand forecasting, and human-in-the-loop dispatch controls. Prioritize a clear operator workflow, explainable ETA changes, and a resilient fallback when live traffic data is missing.',
    freeSolutions: [
      {
        _id: 'solution-1',
        title: 'OpenStreetMap + routing starter',
        description:
          'A practical base for prototyping map-based planning and route previews without expensive infrastructure.',
        link: 'https://www.openstreetmap.org',
        submittedBy: 'solver-1',
        submittedByName: 'Mahi Tesfaye',
        submittedByTitle: 'ML Engineer',
        createdAt: '2026-04-21T10:00:00.000Z',
        problemId: 'problem-ethiopian-logistics-ai',
        problemTitle: 'Build an AI dispatch copilot for last-mile delivery in Addis Ababa',
      },
      {
        _id: 'solution-2',
        title: 'Queueing and dispatch heuristics guide',
        description:
          'Use this as inspiration for balancing urgent deliveries with route efficiency in the first prototype.',
        link: 'https://developers.google.com/optimization',
        submittedBy: 'solver-2',
        submittedByName: 'Samuel Bekele',
        submittedByTitle: 'Operations Analyst',
        createdAt: '2026-04-22T08:30:00.000Z',
        problemId: 'problem-ethiopian-logistics-ai',
        problemTitle: 'Build an AI dispatch copilot for last-mile delivery in Addis Ababa',
      },
    ],
    comments: [
      {
        _id: 'comment-1',
        comment:
          'I would start with a scoring model that weighs parcel age, rider proximity, and corridor congestion before moving to heavier optimization.',
        likes: 14,
        createdBy: 'solver-1',
        createdByName: 'Mahi Tesfaye',
        createdByTitle: 'ML Engineer',
        createdAt: '2026-04-21T13:10:00.000Z',
      },
      {
        _id: 'comment-2',
        comment:
          'For the MVP, a dispatcher override panel is critical. Teams adopt these tools faster when they can understand and correct the AI suggestion.',
        likes: 9,
        createdBy: 'solver-2',
        createdByName: 'Samuel Bekele',
        createdByTitle: 'Operations Analyst',
        createdAt: '2026-04-22T09:45:00.000Z',
      },
    ],
    commentsCount: 2,
    author: {
      _id: 'client-1',
      companyName: 'AddisFlow Logistics',
      title: 'Operations Team',
      reputationScore: 91,
    },
  },
  {
    _id: 'problem-health-triage-assistant',
    title: 'Prototype a multilingual patient intake assistant for clinics',
    desc:
      'Small clinics want a guided intake experience that can capture symptoms, urgency, and language preference before a nurse steps in.',
    tags: [
      { stack: ['React', 'TypeScript', 'Accessibility'], complexity: 'medium' },
    ],
    difficulty: 'Advanced',
    status: 'hiring',
    createdBy: 'care-grid',
    createdAt: '2026-04-15T12:30:00.000Z',
    applicationDeadline: '2026-05-10T12:00:00.000Z',
    AIAnalysis:
      'The highest-value prototype will focus on trust: simple language, transparent symptom summarization, and careful escalation cues for urgent cases.',
    freeSolutions: [
      {
        _id: 'solution-3',
        title: 'Designing conversational health flows',
        description:
          'Good reference material for structuring branching symptom intake without overwhelming the patient.',
        link: 'https://www.who.int',
        submittedBy: 'solver-3',
        submittedByName: 'Ruth Alemu',
        submittedByTitle: 'Frontend Engineer',
        createdAt: '2026-04-18T09:15:00.000Z',
        problemId: 'problem-health-triage-assistant',
        problemTitle: 'Prototype a multilingual patient intake assistant for clinics',
      },
    ],
    comments: [
      {
        _id: 'comment-3',
        comment:
          'This would benefit from an offline-ready draft mode because reception desks often have unstable connectivity.',
        likes: 6,
        createdBy: 'solver-3',
        createdByName: 'Ruth Alemu',
        createdByTitle: 'Frontend Engineer',
        createdAt: '2026-04-18T14:20:00.000Z',
      },
    ],
    commentsCount: 1,
    author: {
      _id: 'client-2',
      companyName: 'CareGrid Clinics',
      title: 'Innovation Office',
      reputationScore: 88,
    },
  },
];

export const mockProblemsList = mockProblems.map((problem) => ({
  ...problem,
}));

export function findMockProblem(problemId: string) {
  return mockProblems.find((problem) => problem._id === problemId);
}
