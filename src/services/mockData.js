// services/mockData.js

// Apufunktio projektikokemuksen generointiin
const generateProjects = () => {
    const projects = [
      { name: 'Verkkokauppa-alusta', tech: ['React', 'Node.js', 'MongoDB'], duration: '12kk' },
      { name: 'IoT-järjestelmä', tech: ['Python', 'AWS', 'Docker'], duration: '8kk' },
      { name: 'Mobiilisovellus', tech: ['React Native', 'Firebase'], duration: '6kk' },
      { name: 'ERP-integraatio', tech: ['Java', 'Spring Boot', 'SQL'], duration: '10kk' }
    ];
    
    return projects.slice(0, Math.floor(Math.random() * 3) + 1);
  };
  
  // Apufunktio sertifikaattien generointiin
  const generateCertifications = () => {
    const certifications = [
      { name: 'AWS Certified Developer', provider: 'Amazon', year: 2023 },
      { name: 'SCRUM Master', provider: 'Scrum Alliance', year: 2022 },
      { name: 'Azure Developer Associate', provider: 'Microsoft', year: 2023 },
      { name: 'React Developer', provider: 'Meta', year: 2022 }
    ];
    
    return certifications.slice(0, Math.floor(Math.random() * 3) + 1);
  };
  
  export const consultants = [
    {
      id: '1',
      firstName: 'Matti',
      lastName: 'Virtanen',
      education: {
        degree: 'Diplomi-insinööri',
        program: 'Ohjelmistotekniikka',
        graduationYear: 2018
      },
      certifications: generateCertifications(),
      projects: generateProjects(),
      skills: [
        { name: 'React', level: 5, yearsOfExperience: 4 },
        { name: 'Node.js', level: 4, yearsOfExperience: 3 },
        { name: 'TypeScript', level: 4, yearsOfExperience: 2 },
        { name: 'AWS', level: 3, yearsOfExperience: 2 }
      ],
      startYear: 2018,
      yearsOfExperience: 6
    },
    {
      id: '2',
      firstName: 'Liisa',
      lastName: 'Korhonen',
      education: {
        degree: 'Insinööri (AMK)',
        program: 'Tietotekniikka',
        graduationYear: 2020
      },
      certifications: generateCertifications(),
      projects: generateProjects(),
      skills: [
        { name: 'Python', level: 5, yearsOfExperience: 3 },
        { name: 'Docker', level: 4, yearsOfExperience: 2 },
        { name: 'React', level: 3, yearsOfExperience: 2 }
      ],
      startYear: 2020,
      yearsOfExperience: 4
    },
    {
      id: '3',
      firstName: 'Mikko',
      lastName: 'Järvinen',
      education: {
        degree: 'Filosofian maisteri',
        program: 'Tietojenkäsittelytiede',
        graduationYear: 2015
      },
      certifications: generateCertifications(),
      projects: generateProjects(),
      skills: [
        { name: 'Java', level: 5, yearsOfExperience: 8 },
        { name: 'Spring Boot', level: 5, yearsOfExperience: 6 },
        { name: 'SQL', level: 4, yearsOfExperience: 8 }
      ],
      startYear: 2015,
      yearsOfExperience: 9
    }
  ];
  
  // Apufunktiot datan hakemiseen
  export const getConsultants = () => {
    return Promise.resolve(consultants);
  };
  
  export const getConsultantById = (id) => {
    const consultant = consultants.find(c => c.id === id);
    return Promise.resolve(consultant || null);
  };
  
  // Hakufunktio konsulteille
  export const searchConsultants = (query) => {
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = consultants.filter(consultant => {
      // Haku nimen perusteella
      const fullName = `${consultant.firstName} ${consultant.lastName}`.toLowerCase();
      if (fullName.includes(lowercaseQuery)) return true;
      
      // Haku taitojen perusteella
      if (consultant.skills.some(skill => skill.name.toLowerCase().includes(lowercaseQuery))) return true;
      
      // Haku sertifikaattien perusteella
      if (consultant.certifications.some(cert => cert.name.toLowerCase().includes(lowercaseQuery))) return true;
      
      // Haku projektikokemusten perusteella
      if (consultant.projects.some(project => 
        project.name.toLowerCase().includes(lowercaseQuery) || 
        project.tech.some(t => t.toLowerCase().includes(lowercaseQuery))
      )) return true;
      
      return false;
    });
    
    return Promise.resolve(filtered);
  };