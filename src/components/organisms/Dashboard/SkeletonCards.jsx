// components/organisms/Dashboard/SkeletonCards.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const StatCardSkeleton = () => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="h-12 w-12 bg-slate-200 rounded-full animate-pulse" />
      </div>
    </CardContent>
  </Card>
);

export const ChartSkeleton = () => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader>
      <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
    </CardHeader>
    <CardContent>
      <div className="h-[300px] bg-slate-100 rounded animate-pulse" />
    </CardContent>
  </Card>
);

export const RecentConsultantsSkeleton = () => (
  <Card className="col-span-full lg:col-span-1">
    <CardHeader>
      <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-slate-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Päivitetty DashboardPage.jsx
import { useEffect, useState } from 'react';
import { getConsultants } from '../../services/mockData';
import DashboardStats from '../../components/organisms/Dashboard/DashboardStats';
import TopSkillsChart from '../../components/organisms/Dashboard/TopSkillsChart';
import RecentConsultants from '../../components/organisms/Dashboard/RecentConsultants';
import { 
  StatCardSkeleton, 
  ChartSkeleton, 
  RecentConsultantsSkeleton 
} from '../../components/organisms/Dashboard/SkeletonCards';

const DashboardPage = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getConsultants();
        setConsultants(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Tietojen lataaminen epäonnistui. Yritä päivittää sivu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Osaamisenhallinta</h1>
      
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <DashboardStats consultants={consultants} />
          )}
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              <ChartSkeleton />
              <RecentConsultantsSkeleton />
            </>
          ) : (
            <>
              <TopSkillsChart consultants={consultants} />
              <RecentConsultants consultants={consultants} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;