import { useCallback, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';

const ConsultantFilters = ({
  filters,
  onSearchChange,
  onTechnologyChange,
  onCertificationChange,
  onExperienceChange
}) => {
  // Debounce hakua
  const debouncedSearchChange = useCallback((value) => {
    const timeoutId = setTimeout(() => {
      onSearchChange(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [onSearchChange]);

  const experienceOptions = useMemo(() => [
    { value: 0, label: 'Kaikki' },
    { value: 2, label: '2+ vuotta' },
    { value: 5, label: '5+ vuotta' },
    { value: 8, label: '8+ vuotta' }
  ], []);

  return (
    <div className="bg-background border rounded-lg p-4">
      <div className="space-y-4">
        {/* Hakupalkki */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Hae nimellä, taidoilla tai sertifikaateilla..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            defaultValue={filters.search}
            onChange={(e) => debouncedSearchChange(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Kokemusvuodet */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">
              Kokemusvuodet
            </label>
            <select
              value={filters.experienceYears || 0}
              onChange={(e) => onExperienceChange(Number(e.target.value) || null)}
              className="w-full border rounded-md py-2 px-3"
            >
              {experienceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Aktiiviset filtterit */}
          <div className="flex flex-wrap gap-2 items-center">
            {filters.technologies.map(tech => (
              <span
                key={tech}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
              >
                {tech}
                <button
                  onClick={() => onTechnologyChange(
                    filters.technologies.filter(t => t !== tech)
                  )}
                  className="ml-2 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.certifications.map(cert => (
              <span
                key={cert}
                className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm"
              >
                {cert}
                <button
                  onClick={() => onCertificationChange(
                    filters.certifications.filter(c => c !== cert)
                  )}
                  className="ml-2 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantFilters;