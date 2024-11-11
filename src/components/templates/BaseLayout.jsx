// src/components/templates/BaseLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Home, Users, FileText, BarChart2, Settings } from 'lucide-react';

const BaseLayout = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Konsultit', href: '/konsultit', icon: Users },
    { name: 'CV Hallinta', href: '/cv', icon: FileText },
    { name: 'Raportit', href: '/raportit', icon: BarChart2 },
    { name: 'Asetukset', href: '/asetukset', icon: Settings },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sivupalkki */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center px-6">
          <span className="text-xl font-semibold">Pinja</span>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 mt-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Pääsisältö */}
      <main className="pl-64">
        <header className="h-16 bg-white shadow-sm">
          <div className="h-full px-6 flex items-center">
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
        </header>
        
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default BaseLayout;