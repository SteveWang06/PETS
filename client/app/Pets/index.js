import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

export default Root;
