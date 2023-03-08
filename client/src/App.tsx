import { trpc } from './trpc'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppContent from './AppContent';

const App = () => {


  const [queryClient] = useState(() => {
    return new QueryClient()
  })


  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [httpBatchLink({
        url: 'http://localhost:3000/trpc',
      })],
    })
  })


  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App