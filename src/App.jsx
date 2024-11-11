// C:/Users/e2301997/Desktop/react_pinja/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ConsultantProvider from './context/ConsultantProvider';

// Pages
import { HomePage } from '@/components/pages/HomePage';
import { ConsultantListPage } from '@/components/pages/ConsultantListPage';
import { CVGeneratorPage } from '@/components/pages/CVGeneratorPage';
import { RootLayout } from '@/components/templates/RootLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data pysyy tuoreena 5min
      cacheTime: 30 * 60 * 1000, // Cache säilyy 30min
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConsultantProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="konsultit" element={<ConsultantListPage />} />
              <Route path="cv-generaattori" element={<CVGeneratorPage />} />
            </Route>
          </Routes>
        </Router>
      </ConsultantProvider>
    </QueryClientProvider>
  );
};

export default App;