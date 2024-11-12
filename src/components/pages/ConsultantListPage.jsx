import { useConsultants } from '../../hooks/useConsultants';
import ConsultantList from '../organisms/ConsultantList/ConsultantList';
import ConsultantFilters from '../organisms/ConsultantList/ConsultantFilters';

export const ConsultantListPage = () => {
  const {
    consultants,
    loading,
    error,
    filters,
    updateSearchFilter,
    updateTechnologyFilter,
    updateCertificationFilter,
    updateExperienceFilter
  } = useConsultants();

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Konsultit</h1>
        <div className="flex gap-2">
          <span className="text-muted-foreground">
            {consultants.length} konsulttia
          </span>
        </div>
      </div>

      <ConsultantFilters
        filters={filters}
        onSearchChange={updateSearchFilter}
        onTechnologyChange={updateTechnologyFilter}
        onCertificationChange={updateCertificationFilter}
        onExperienceChange={updateExperienceFilter}
      />

      <ConsultantList
        consultants={consultants}
        loading={loading}
      />
    </div>
  );
};