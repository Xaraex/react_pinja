// src/components/pages/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Tervetuloa Pinjan osaamisenhallintajärjestelmään!</p>
    </div>
  );
};

export default Dashboard;

// src/components/pages/Consultants.jsx
import React from 'react';

const Consultants = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Konsultit</h1>
      <p>Konsulttien listaus- ja hallintanäkymä</p>
    </div>
  );
};

export default Consultants;

// src/components/pages/CvManager.jsx
import React from 'react';

const CvManager = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">CV Hallinta</h1>
      <p>CV:iden hallinta ja generointinäkymä</p>
    </div>
  );
};

export default CvManager;

// src/components/pages/Reports.jsx
import React from 'react';

const Reports = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Raportit</h1>
      <p>Raportointi ja visualisointinäkymä</p>
    </div>
  );
};

export default Reports;

// src/components/pages/Settings.jsx
import React from 'react';

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Asetukset</h1>
      <p>Järjestelmän asetukset ja konfiguraatio</p>
    </div>
  );
};

export default Settings;