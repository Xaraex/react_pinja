import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Etusivu', path: '/' },
    { name: 'Konsultit', path: '/konsultit' },
    { name: 'CV Generaattori', path: '/cv-generaattori' }
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 p-2 hover:bg-accent rounded-md lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">Pinja Osaaminen</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors hover:text-primary ${
                  isActivePath(item.path) ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex-1 container max-w-screen-2xl flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:relative inset-y-0 z-30 
            w-64 shrink-0 border-r bg-background
            transition-transform duration-300
            lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="space-y-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md
                  transition-colors
                  ${isActivePath(item.path) 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-accent/50'}
                `}
              >
                <ChevronRight 
                  size={16} 
                  className={isActivePath(item.path) ? 'opacity-100' : 'opacity-0'}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;