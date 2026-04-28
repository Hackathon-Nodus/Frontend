import { DEFAULT_PROBLEM_QUERY_KEY } from './config/problem';
import { ProblemsDetailPage } from './features/problems/components/ProblemsDetailPage';

export default function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const problemId = searchParams.get(DEFAULT_PROBLEM_QUERY_KEY) ?? undefined;

  return <ProblemsDetailPage problemId={problemId} />;
}
