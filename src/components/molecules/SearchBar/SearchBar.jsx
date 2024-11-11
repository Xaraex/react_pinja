// components/molecules/SearchBar/SearchBar.jsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
};

// components/organisms/ConsultantList/ConsultantFilters.jsx
import { useState } from 'react';
import SearchBar from '../../molecules/SearchBar/SearchBar';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConsultantFilters = ({ onSearch, onSort }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (value) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Hae nimellä, taidoilla tai sertifikaateilla..."
          />
        </div>
        <Select onValueChange={onSort} defaultValue="name">
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Järjestä..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nimi (A-Ö)</SelectItem>
            <SelectItem value="experience">Kokemusvuodet</SelectItem>
            <SelectItem value="recent">Viimeksi lisätty</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

// Päivitetty ConsultantList.jsx
import { useState, useEffect, useCallback } from 'react';
import { getConsultants, searchConsultants } from '../../../services/mockData';
import ConsultantCard from './ConsultantCard';
import ConsultantFilters from './ConsultantFilters';

const ConsultantList = () => {
  const [consultants, setConsultants] = useState([]);
  const [filteredConsultants, setFilteredConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const data = await getConsultants();
        setConsultants(data);
        setFilteredConsultants(data);
        setLoading(false);
      } catch (err) {
        setError('Konsulttien hakeminen epäonnistui');
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setFilteredConsultants(consultants);
      return;
    }

    try {
      const results = await searchConsultants(query);
      setFilteredConsultants(results);
    } catch (err) {
      setError('Haku epäonnistui');
    }
  }, [consultants]);

  const handleSort = useCallback((sortBy) => {
    const sorted = [...filteredConsultants].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`);
        case 'experience':
          return b.yearsOfExperience - a.yearsOfExperience;
        case 'recent':
          return b.startYear - a.startYear;
        default:
          return 0;
      }
    });
    setFilteredConsultants(sorted);
  }, [filteredConsultants]);

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Konsultit</h2>
        <ConsultantFilters 
          onSearch={handleSearch} 
          onSort={handleSort}
        />
      </div>
      
      {filteredConsultants.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <p>Ei hakutuloksia</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant) => (
            <ConsultantCard key={consultant.id} consultant={consultant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultantList;