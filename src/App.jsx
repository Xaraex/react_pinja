import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ConsultantProvider from './context/ConsultantProvider';

// Pages - using named imports
import { HomePage } from './components/pages/HomePage';
import { ConsultantListPage } from './components/pages/ConsultantListPage';
import { CVGeneratorPage } from './components/pages/CVGeneratorPage';
import { RootLayout } from './components/templates/RootLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConsultantProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <div className="relative flex min-h-screen flex-col">
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="konsultit" element={<ConsultantListPage />} />
                  <Route path="cv-generaattori" element={<CVGeneratorPage />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </ConsultantProvider>
    </QueryClientProvider>
  );
};

export default App;
