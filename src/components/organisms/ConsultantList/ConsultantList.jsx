// C:/Users/e2301997/Desktop/react_pinja/src/components/organisms/ConsultantList/ConsultantList.jsx
import { useState, useEffect } from 'react';
import { getConsultants } from '../../../services/mockData';
import ConsultantCard from './ConsultantCard';

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const data = await getConsultants();
        setConsultants(data);
        setLoading(false);
      } catch (err) {
        setError('Konsulttien hakeminen epäonnistui');
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-48 bg-slate-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Konsultit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultants.map((consultant) => (
          <ConsultantCard key={consultant.id} consultant={consultant} />
        ))}
      </div>
    </div>
  );
};

export default ConsultantList;