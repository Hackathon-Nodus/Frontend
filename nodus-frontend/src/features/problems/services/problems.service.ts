import api from '../../../lib/axios';
import type { Problem } from '../../../types';

export async function getProblems() {
  const response = await api.get<Problem[]>('/problems');
  return response.data;
}

export async function getProblemById(problemId: string) {
  const response = await api.get<Problem>(`/problems/${problemId}`);
  return response.data;
}
