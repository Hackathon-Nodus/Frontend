import { useQuery } from '@tanstack/react-query';

import { getProblemById, getProblems } from '../services/problems.service';

export function useProblemDetail(problemId?: string) {
  const fallbackProblemsQuery = useQuery({
    queryKey: ['problems'],
    queryFn: getProblems,
    enabled: !problemId,
  });

  const derivedProblemId = problemId ?? fallbackProblemsQuery.data?.[0]?._id;

  const problemDetailQuery = useQuery({
    queryKey: ['problems', derivedProblemId],
    queryFn: () => getProblemById(derivedProblemId!),
    enabled: Boolean(derivedProblemId),
  });

  return {
    ...problemDetailQuery,
    isLoading: fallbackProblemsQuery.isLoading || problemDetailQuery.isLoading,
    isError: fallbackProblemsQuery.isError || problemDetailQuery.isError,
    error: problemDetailQuery.error ?? fallbackProblemsQuery.error,
    problemId: derivedProblemId,
  };
}
