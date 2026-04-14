// Test direct de l'API instruments
console.log('Test de l\'API instruments...');

fetch('http://localhost:3000/instrument')
  .then(response => {
    console.log('Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Données reçues:', data);
    console.log('Nombre d\'instruments:', data.length);
    
    // Test de transformation
    const transformed = data.map(item => ({
      id: item.instrument_id,
      name: item.name,
      description: item.description || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      courses: item.courses?.map(course => ({
        id: course.course_id,
        title: course.title,
        description: course.description,
        videoUrl: course.video_url || undefined,
        level: course.level,
        instrumentId: item.instrument_id,
        createdAt: course.publication_date,
        updatedAt: course.publication_date
      })) || []
    }));
    
    console.log('Données transformées:', transformed);
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
