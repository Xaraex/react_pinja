import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button
            className="mr-4 hover:text-primary"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Pinja Osaaminen</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/consultants" className="transition-colors hover:text-primary">
                Konsultit
              </Link>
              <Link to="/cv-generator" className="transition-colors hover:text-primary">
                CV Generaattori
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <nav className="grid items-start px-4 py-6 lg:px-8">
              <Link to="/" className="flex items-center py-2">
                Etusivu
              </Link>
              <Link to="/consultants" className="flex items-center py-2">
                Konsultit
              </Link>
              <Link to="/cv-generator" className="flex items-center py-2">
                CV Generaattori
              </Link>
            </nav>
          </aside>
        )}

        {/* Main */}
        <main className="flex w-full flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;