import { delay, http, HttpResponse } from 'msw';

import { findMockProblem, mockProblemsList } from './data';

export const handlers = [
  http.get('*/problems', async () => {
    await delay(500);

    return HttpResponse.json(mockProblemsList);
  }),

  http.get('*/problems/:problemId', async ({ params }) => {
    await delay(700);

    const problemId = String(params.problemId);
    const problem = findMockProblem(problemId);

    if (!problem) {
      return HttpResponse.json(
        { message: `Mock problem "${problemId}" was not found.` },
        { status: 404 },
      );
    }

    return HttpResponse.json(problem);
  }),
];
