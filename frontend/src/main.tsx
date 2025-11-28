import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { Provider  } from 'react-redux';
import { store } from '@/store/store';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
