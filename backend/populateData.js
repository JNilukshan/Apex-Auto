import mongoose from 'mongoose';
import CarModel from './models/CarModel.js';
import Color from './models/Color.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function populateData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');
    
    // Check if car models already exist
    const existingCarModels = await CarModel.find();
    if (existingCarModels.length === 0) {
      console.log('Adding car models...');
      
      const carModels = [
        { brand: 'Nissan', model: 'GTR', year: 2023, displayName: 'Nissan GTR R35', category: 'JDM' },
        { brand: 'BMW', model: 'M4', year: 2023, displayName: 'BMW M4', category: 'European' },
        { brand: 'Toyota', model: 'Supra', year: 2023, displayName: 'Toyota Supra A90', category: 'JDM' },
        { brand: 'Honda', model: 'Civic Type R', year: 2023, displayName: 'Honda Civic Type R', category: 'JDM' },
        { brand: 'Subaru', model: 'WRX STI', year: 2023, displayName: 'Subaru WRX STI', category: 'JDM' },
        { brand: 'Mazda', model: 'RX-7', year: 1999, displayName: 'Mazda RX-7', category: 'JDM' },
        { brand: 'Mitsubishi', model: 'Lancer Evolution', year: 2015, displayName: 'Mitsubishi Lancer Evolution', category: 'JDM' },
        { brand: 'Porsche', model: '911 GT3', year: 2023, displayName: 'Porsche 911 GT3', category: 'European' }
      ];
      
      for (let carModelData of carModels) {
        const carModel = new CarModel(carModelData);
        await carModel.save();
        console.log(`Added: ${carModel.displayName}`);
      }
    } else {
      console.log(`Car models already exist: ${existingCarModels.length} found`);
    }
    
    // Check if colors already exist
    const existingColors = await Color.find();
    if (existingColors.length === 0) {
      console.log('Adding colors...');
      
      const colors = [
        { name: 'Jet Black', hexValue: '#0a0a0a', category: 'Standard' },
        { name: 'Pure White', hexValue: '#f5f5f5', category: 'Standard' },
        { name: 'Racing Red', hexValue: '#dc2626', category: 'Standard' },
        { name: 'Electric Blue', hexValue: '#2563eb', category: 'Standard' },
        { name: 'Neon Yellow', hexValue: '#fbbf24', category: 'Standard' },
        { name: 'Metallic Silver', hexValue: '#94a3b8', category: 'Metallic' },
        { name: 'Matte Gray', hexValue: '#4b5563', category: 'Matte' },
        { name: 'Deep Purple', hexValue: '#7c3aed', category: 'Standard' }
      ];
      
      for (let colorData of colors) {
        const color = new Color(colorData);
        await color.save();
        console.log(`Added: ${color.name}`);
      }
    } else {
      console.log(`Colors already exist: ${existingColors.length} found`);
    }
    
    console.log('Data population completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

populateData();