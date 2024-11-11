// src/hooks/useConsultants.jsx
import { useContext, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getConsultants } from '../services/mockData';
import { ConsultantContext } from '../context/ConsultantContext';

export const useConsultants = () => {
  const context = useContext(ConsultantContext);

  if (!context) {
    throw new Error('useConsultants must be used within a ConsultantProvider');
  }

  const {
    consultants,
    filters,
    loading,
    error,
    setConsultants,
    setFilters,
    setLoading,
    setError
  } = context;

  const { refetch } = useQuery({
    queryKey: ['consultants'],
    queryFn: getConsultants,
    onSuccess: (data) => setConsultants(data),
    onError: (error) => setError(error.message)
  });

  const filteredConsultants = useMemo(() => {
    return consultants.filter(consultant => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const fullName = `${consultant.firstName} ${consultant.lastName}`.toLowerCase();
        const hasNameMatch = fullName.includes(searchLower);
        const hasSkillMatch = consultant.skills.some(
          skill => skill.name.toLowerCase().includes(searchLower)
        );
        const hasCertMatch = consultant.certifications.some(
          cert => cert.name.toLowerCase().includes(searchLower)
        );
        
        if (!hasNameMatch && !hasSkillMatch && !hasCertMatch) return false;
      }

      if (filters.technologies.length > 0) {
        const hasRequiredTech = filters.technologies.every(tech =>
          consultant.skills.some(skill => skill.name === tech)
        );
        if (!hasRequiredTech) return false;
      }

      if (filters.certifications.length > 0) {
        const hasRequiredCert = filters.certifications.every(cert =>
          consultant.certifications.some(c => c.name === cert)
        );
        if (!hasRequiredCert) return false;
      }

      if (filters.experienceYears) {
        if (consultant.yearsOfExperience < filters.experienceYears) return false;
      }

      return true;
    });
  }, [consultants, filters]);

  const updateSearchFilter = useCallback((search) => {
    setFilters({ search });
  }, [setFilters]);

  const updateTechnologyFilter = useCallback((technologies) => {
    setFilters({ technologies });
  }, [setFilters]);

  const updateCertificationFilter = useCallback((certifications) => {
    setFilters({ certifications });
  }, [setFilters]);

  const updateExperienceFilter = useCallback((experienceYears) => {
    setFilters({ experienceYears });
  }, [setFilters]);

  return {
    consultants: filteredConsultants,
    loading,
    error,
    filters,
    updateSearchFilter,
    updateTechnologyFilter,
    updateCertificationFilter,
    updateExperienceFilter,
    refetchConsultants: refetch
  };
};

export default useConsultants;