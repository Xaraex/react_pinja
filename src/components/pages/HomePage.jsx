import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tervetuloa Pinjan osaamisenhallintaan</h1>
      <p className="text-lg text-muted-foreground">
        Hallinnoi konsulttien osaamista ja generoi CV:itä helposti.
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/konsultit" className="rounded-lg border p-4 hover:border-primary transition-colors">
          <h2 className="text-xl font-semibold mb-2">Konsulttien hallinta</h2>
          <p className="text-muted-foreground">Selaa ja hallinnoi konsulttien profiileja.</p>
        </Link>
        
        <Link to="/cv-generaattori" className="rounded-lg border p-4 hover:border-primary transition-colors">
          <h2 className="text-xl font-semibold mb-2">CV Generaattori</h2>
          <p className="text-muted-foreground">Luo ja muokkaa CV:itä helposti.</p>
        </Link>
        
        <Link to="/konsultit" className="rounded-lg border p-4 hover:border-primary transition-colors">
          <h2 className="text-xl font-semibold mb-2">Osaamisprofiilit</h2>
          <p className="text-muted-foreground">Visualisoi osaamista ja sertifikaatteja.</p>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;