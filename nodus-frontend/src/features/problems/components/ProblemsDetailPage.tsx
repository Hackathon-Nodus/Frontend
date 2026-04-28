import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  FireIcon,
  HandThumbUpIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import type {
  FreeSolution,
  Problem,
  ProblemComment,
  ProblemStatus,
} from '../../../types';
import { cn } from '../../../utils/cn';
import { useProblemDetail } from '../hooks/useProblemDetail';

interface ProblemsDetailPageProps {
  problemId?: string;
}

const statusToneMap: Record<ProblemStatus, 'accent' | 'success' | 'warning'> = {
  open: 'accent',
  hiring: 'success',
  closed: 'warning',
};

const AVATAR_TONES = [
  'bg-indigo-600',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-sky-500',
];
const isMockApiEnabled =
  import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_MOCKING === 'true';

export function ProblemsDetailPage({ problemId }: ProblemsDetailPageProps) {
  const { data: problem, error, isError, isLoading } = useProblemDetail(problemId);

  if (isLoading) {
    return (
      <ProblemState
        title="Loading problem"
        description="Pulling the latest problem details from the API."
      />
    );
  }

  if (isError) {
    const message =
      error instanceof Error
        ? error.message
        : 'The problem detail endpoint did not return a usable response.';

    return (
      <ProblemState
        icon={ExclamationTriangleIcon}
        title="Problem unavailable"
        description={message}
      />
    );
  }

  if (!problem) {
    return (
      <ProblemState
        icon={ClockIcon}
        title="No problem found"
        description="We could not find a problem to display yet. Try opening this page with a problem id in the URL query string."
      />
    );
  }

  return <ProblemDetailContent problem={problem} />;
}

function ProblemDetailContent({ problem }: { problem: Problem }) {
  const normalizedComments = problem.comments.map((comment, index) =>
    normalizeComment(comment, index),
  );

  const normalizedFreeSolutions = problem.freeSolutions
    .map((solution, index) => normalizeSolution(solution, index))
    .filter((solution) => Boolean(solution.title || solution.description || solution.link));

  const primaryStack = problem.tags.flatMap((tag) => tag.stack);
  const complexityTags = problem.tags.map((tag) => tag.complexity).filter(Boolean);
  const authorName = problem.author?.companyName ?? problem.author?.name ?? problem.createdBy;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 transition hover:text-slate-950">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Feed
          </button>
          {isMockApiEnabled ? (
            <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">
              Mock API enabled
            </Badge>
          ) : null}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <Badge>{primaryStack[0] ? `#${primaryStack[0]}` : '#Problem'}</Badge>
                <div className="inline-flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>Posted {formatRelativeDate(problem.createdAt)}</span>
                </div>
                <Badge tone="accent">{problem.difficulty}</Badge>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  {problem.title}
                </h1>
                <p className="max-w-4xl text-lg leading-8 text-slate-600">
                  {problem.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {primaryStack.map((stack, index) => (
                  <Badge
                    className="normal-case tracking-normal"
                    key={`${stack}-${index}`}
                    tone="neutral"
                  >
                    {stack}
                  </Badge>
                ))}
                {complexityTags.map((complexity, index) => (
                  <Badge
                    className="normal-case tracking-normal"
                    key={`${complexity}-${index}`}
                    tone="accent"
                  >
                    Complexity: {complexity}
                  </Badge>
                ))}
              </div>
            </div>

            <Card className="overflow-hidden border-indigo-200 bg-[linear-gradient(180deg,_rgba(99,102,241,0.10),_rgba(255,255,255,0.88))] p-6 sm:p-8">
              <div className="flex items-center gap-3 text-indigo-700">
                <SparklesIcon className="h-6 w-6" />
                <h2 className="text-2xl font-bold">Architectural AI Analysis</h2>
              </div>
              <div className="mt-5 whitespace-pre-line text-base leading-8 text-indigo-900/90">
                {problem.AIAnalysis}
              </div>
            </Card>

            {normalizedFreeSolutions.length > 0 ? (
              <section className="space-y-5">
                <SectionHeading
                  eyebrow="Helpful context"
                  title={`Community Solutions (${normalizedFreeSolutions.length})`}
                />
                <div className="grid max-w-4xl gap-4 md:grid-cols-2">
                  {normalizedFreeSolutions.map((solution) => (
                    <Card className="p-5" key={solution._id}>
                      <div className="flex h-full flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
                              solution.avatarTone,
                            )}
                          >
                            {solution.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-950">
                              {solution.submittedByName ?? solution.submittedBy}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                              <span>{solution.submittedByTitle ?? 'Community solver'}</span>
                              {solution.createdAt ? (
                                <span>{formatRelativeDate(solution.createdAt)}</span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-950">
                          {solution.title}
                        </h3>
                        <p className="text-sm leading-7 text-slate-600">
                          {solution.description}
                        </p>
                        {solution.link ? (
                          <a
                            className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-900"
                            href={solution.link}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Open solution
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="space-y-5">
              <SectionHeading
                eyebrow="Discussion"
                title={`Comments (${problem.commentsCount})`}
              />

              <div className="max-w-4xl space-y-4">
                {normalizedComments.map((comment) => (
                  <Card className="p-6 sm:p-7" key={comment.id}>
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white',
                          comment.avatarTone,
                        )}
                      >
                        {comment.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-xl font-bold text-slate-950">
                            {comment.authorName}
                          </h3>
                          <span className="text-sm text-slate-500">
                            {comment.authorTitle}
                          </span>
                          {comment.createdAt ? (
                            <span className="text-sm text-slate-500">
                              {formatRelativeDate(comment.createdAt)}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-4 text-base leading-8 text-slate-600">
                          {comment.content}
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                          <HandThumbUpIcon className="h-4 w-4" />
                          {comment.likes}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="max-w-4xl p-4 sm:p-5">
                <form className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    aria-label="Share your thoughts"
                    placeholder="Share your thoughts..."
                  />
                  <Button className="sm:min-w-40" size="lg" type="submit">
                    Comment
                  </Button>
                </form>
              </Card>
            </section>
          </section>

          <aside className="xl:sticky xl:top-8 xl:self-start">
            <Card className="p-7">
              <div className="space-y-7">
                <div className="grid gap-5">
                  <KeyValue
                    label="Status"
                    value={<Badge tone={statusToneMap[problem.status]}>{problem.status}</Badge>}
                  />
                  <Button size="lg">Share a Solution</Button>
                </div>

                <div className="grid gap-4 border-y border-slate-200 py-6">
                  <SidebarStat
                    icon={CpuChipIcon}
                    label="Solutions shared"
                    value={String(normalizedFreeSolutions.length)}
                  />
                  <SidebarStat
                    icon={FireIcon}
                    label="Difficulty"
                    value={problem.difficulty}
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Posted by
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                      {getInitials(authorName)}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-950">{authorName}</p>
                      <p className="text-sm text-slate-500">
                        {problem.author?.title ?? 'Client'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ProblemState({
  description,
  icon: Icon = ClockIcon,
  title,
}: {
  description: string;
  icon?: typeof ClockIcon;
  title: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="max-w-lg p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-700">
          <Icon className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-950">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </Card>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-slate-950">{title}</h2>
    </div>
  );
}

function KeyValue({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <div>{value}</div>
    </div>
  );
}

function SidebarStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ClockIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-2xl bg-slate-100 p-2 text-slate-700">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-base font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function normalizeComment(comment: ProblemComment, index: number) {
  const authorName = comment.createdByName ?? comment.createdBy;

  return {
    id: comment._id ?? `comment-${index}`,
    content: comment.comment,
    createdAt: comment.createdAt,
    authorName,
    authorTitle: comment.createdByTitle ?? 'Community member',
    initials: getInitials(authorName),
    likes: comment.likes ?? 0,
    avatarTone: AVATAR_TONES[index % AVATAR_TONES.length],
  };
}

function normalizeSolution(solution: FreeSolution, index: number) {
  const displayName = solution.submittedByName ?? solution.submittedBy;

  return {
    ...solution,
    _id: solution._id ?? `free-solution-${index}`,
    submittedByName: displayName,
    initials: getInitials(displayName),
    avatarTone: AVATAR_TONES[index % AVATAR_TONES.length],
  };
}

function getInitials(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function formatRelativeDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'recently';
  }

  const diffInMs = Date.now() - date.getTime();
  const diffInDays = Math.max(1, Math.round(diffInMs / (1000 * 60 * 60 * 24)));

  if (diffInDays === 1) {
    return '1 day ago';
  }

  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.round(diffInDays / 30);

  if (diffInMonths === 1) {
    return '1 month ago';
  }

  return `${diffInMonths} months ago`;
}
