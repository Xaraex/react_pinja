function ConsultantListPage() {
    console.log('ConsultantListPage rendered'); // Lisätään debug-loki
    
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Konsulttien hallinta</h1>
        <p className="text-muted-foreground">
          Selaa ja hallinnoi konsulttien profiileja.
        </p>
        <div className="rounded-lg border p-4">
          <p>Konsulttilista tulee tähän...</p>
        </div>
      </div>
    );
  }
  
  export default ConsultantListPage;