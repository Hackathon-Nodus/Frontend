import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App.tsx';
import './index.css';
import { queryClient } from './lib/react-query.ts';

async function enableMocking() {
  if (!import.meta.env.DEV || import.meta.env.VITE_ENABLE_API_MOCKING !== 'true') {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

async function bootstrap() {
  await enableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
}

void bootstrap();
