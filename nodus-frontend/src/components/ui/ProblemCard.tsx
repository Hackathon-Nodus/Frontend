import { Avatar } from './Avatar';
import { Badge } from './Badge';
import type { FeedProblem } from '../../types/problem';

interface ProblemCardProps {
  problem: FeedProblem;
  onClick?: () => void;
}

export function ProblemCard({ problem, onClick }: ProblemCardProps) {
  const isClosed = problem.status === 'completed' || problem.status === 'closed';

  return (
    <div
      onClick={isClosed ? undefined : onClick}
      className={`bg-surface-white border border-outline-subtle rounded-nodus p-6 transition-shadow ${
        isClosed 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-flat cursor-pointer'
      }`}
    >
      <div className="flex items-start gap-4">
        <Avatar src={problem.avatar} alt={problem.company} size="md" fallback={problem.company.substring(0, 2)} />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className={`font-display font-semibold ${isClosed ? 'text-content-slate' : 'text-content-charcoal'}`}>
                {problem.company}
              </h3>
              <p className="text-xs text-content-slate">{problem.companyType}</p>
            </div>
            {problem.badge && (
              <Badge variant={problem.status === 'completed' ? 'neutral' : 'info'}>
                {problem.badge}
              </Badge>
            )}
          </div>

          <h4 className={`text-lg font-semibold mb-2 ${isClosed ? 'text-content-slate' : 'text-content-charcoal'}`}>
            {problem.title}
          </h4>
          <p className="text-sm text-content-slate line-clamp-3 mb-4">{problem.description}</p>

          <div className="flex items-center gap-4 text-xs text-content-slate">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {problem.responses}
            </span>
            <span className="flex items-center gap-1">
              {isClosed ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Closed
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {problem.postedAt}
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
