// components/organisms/ConsultantList/ConsultantCard.jsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

const ConsultantCard = ({ consultant }) => {
  const { firstName, lastName, skills, education, yearsOfExperience } = consultant;
  
  // Näytetään vain top 3 taitoa
  const topSkills = skills
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
          <User className="h-6 w-6 text-slate-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{firstName} {lastName}</h3>
          <p className="text-sm text-slate-500">{education.degree}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Kokemus: {yearsOfExperience} vuotta</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <Badge key={skill.name} variant="secondary">
                {skill.name} ({skill.level}/5)
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// components/organisms/ConsultantList/ConsultantList.jsx
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

// pages/ConsultantsPage.jsx
import ConsultantList from '../components/organisms/ConsultantList/ConsultantList';

const ConsultantsPage = () => {
  return (
    <div className="container mx-auto">
      <ConsultantList />
    </div>
  );
};

export default ConsultantsPage;