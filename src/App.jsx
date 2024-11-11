import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import layouts and pages
import RootLayout from './components/templates/RootLayout';
import HomePage from './components/pages/HomePage.jsx';
import ConsultantListPage from './components/pages/ConsultantListPage';
import ConsultantProfilePage from './components/pages/ConsultantProfilePage';
import CVGeneratorPage from './components/pages/CVGeneratorPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="consultants" element={<ConsultantListPage />} />
            <Route path="consultants/:id" element={<ConsultantProfilePage />} />
            <Route path="cv-generator" element={<CVGeneratorPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;