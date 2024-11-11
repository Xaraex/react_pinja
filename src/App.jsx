import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import HomePage from './components/pages/HomePage';
import ConsultantListPage from './components/pages/ConsultantListPage';
import CVGeneratorPage from './components/pages/CVGeneratorPage';
import RootLayout from './components/templates/RootLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="konsultit" element={<ConsultantListPage />} />
            <Route path="cv-generaattori" element={<CVGeneratorPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;