// src/context/ConsultantProvider.jsx
import { useReducer, useCallback } from 'react';
import { ConsultantContext } from './ConsultantContext';

const initialState = {
  consultants: [],
  filters: {
    search: '',
    technologies: [],
    certifications: [],
    experienceYears: null
  },
  loading: false,
  error: null
};

const consultantReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONSULTANTS':
      return { ...state, consultants: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
};

export const ConsultantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(consultantReducer, initialState);

  const setConsultants = useCallback((consultants) => {
    dispatch({ type: 'SET_CONSULTANTS', payload: consultants });
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const value = {
    ...state,
    setConsultants,
    setFilters,
    setLoading,
    setError
  };

  return (
    <ConsultantContext.Provider value={value}>
      {children}
    </ConsultantContext.Provider>
  );
};

export default ConsultantProvider;