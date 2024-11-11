// src/components/molecules/ErrorBoundary.jsx
import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Jotain meni pieleen
        </h1>
        <p className="text-gray-600 mb-4">
          {error?.message || 'Odottamaton virhe tapahtui'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Palaa etusivulle
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;