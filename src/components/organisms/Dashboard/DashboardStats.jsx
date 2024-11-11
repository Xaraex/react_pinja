const StatCard = ({ title, value, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">
          {Icon && <Icon className="h-5 w-5 text-gray-700" />}
        </div>
      </div>
    </div>
  );
  
  const DashboardStats = ({ consultants }) => {
    if (!consultants?.length) return null;
  
    const totalConsultants = consultants.length;
    const totalCertifications = consultants.reduce(
      (sum, c) => sum + (c.certifications?.length || 0), 
      0
    );
    const totalProjects = consultants.reduce(
      (sum, c) => sum + (c.projects?.length || 0), 
      0
    );
    const uniqueSkills = new Set(
      consultants.flatMap(c => c.skills?.map(s => s.name) || [])
    ).size;
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Konsultteja" value={totalConsultants} />
        <StatCard title="Sertifikaatteja" value={totalCertifications} />
        <StatCard title="Projekteja" value={totalProjects} />
        <StatCard title="Teknologioita" value={uniqueSkills} />
      </div>
    );
  };
  
  export default DashboardStats;
  
  // components/organisms/Dashboard/SkeletonCards.jsx
  const StatCardSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );