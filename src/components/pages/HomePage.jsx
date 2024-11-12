// HomePage.jsx
import { useQuery } from '@tanstack/react-query';
import { getConsultants } from '../../services/mockData';
import { Users, Award, Briefcase, Code } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, description }) => (
  <div className="bg-background border rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="p-3 bg-accent/50 rounded-full">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

const DashboardStats = ({ consultants }) => {
  if (!consultants?.length) return null;

  const stats = [
    { title: 'Konsultteja', value: consultants.length, icon: Users },
    { title: 'Sertifikaatteja', value: consultants.reduce((sum, c) => sum + (c.certifications?.length || 0), 0), icon: Award },
    { title: 'Projekteja', value: consultants.reduce((sum, c) => sum + (c.projects?.length || 0), 0), icon: Briefcase },
    { title: 'Teknologioita', value: new Set(consultants.flatMap(c => c.skills?.map(s => s.name) || [])).size, icon: Code }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

const TopSkills = ({ consultants }) => {
  const skillStats = consultants.reduce((acc, consultant) => {
    consultant.skills.forEach(skill => {
      if (!acc[skill.name]) {
        acc[skill.name] = { count: 0, totalLevel: 0 };
      }
      acc[skill.name].count++;
      acc[skill.name].totalLevel += skill.level;
    });
    return acc;
  }, {});

  const topSkills = Object.entries(skillStats)
    .map(([name, stats]) => ({
      name,
      count: stats.count,
      avgLevel: +(stats.totalLevel / stats.count).toFixed(1)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="bg-background border rounded-lg p-6">
      <h3 className="font-semibold mb-4">Yleisimmät teknologiat</h3>
      <div className="space-y-4">
        {topSkills.map(skill => (
          <div key={skill.name} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">
                  {skill.count} konsulttia, taso {skill.avgLevel}/5
                </span>
              </div>
              <div className="w-full bg-accent/30 rounded-full h-2">
                <div
                  className="bg-accent rounded-full h-2"
                  style={{ width: `${(skill.count / consultants.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HomePage = () => {
  const { data: consultants, isLoading, error } = useQuery({
    queryKey: ['consultants'],
    queryFn: getConsultants
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-accent/10 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-red-700">
        Tietojen lataaminen epäonnistui. Yritä päivittää sivu.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <DashboardStats consultants={consultants} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSkills consultants={consultants} />
      </div>
    </div>
  );
};
