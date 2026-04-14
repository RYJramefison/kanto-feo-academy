// Script de test pour vérifier l'appel API instruments
import { instrumentService } from './services/instrumentService.js';

async function testInstruments() {
  console.log('Début du test des instruments...');
  
  try {
    const instruments = await instrumentService.getAll();
    console.log('Instruments récupérés:', instruments);
    console.log('Nombre d\'instruments:', instruments.length);
    
    instruments.forEach((instrument, index) => {
      console.log(`Instrument ${index + 1}:`, {
        id: instrument.id,
        name: instrument.name,
        description: instrument.description
      });
    });
    
  } catch (error) {
    console.error('Erreur lors du test:', error);
  }
}

testInstruments();
