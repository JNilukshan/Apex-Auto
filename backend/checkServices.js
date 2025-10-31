import mongoose from 'mongoose';
import Service from './models/Service.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkServices() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');
    
    const services = await Service.find();
    console.log(`Found ${services.length} services in database:`);
    services.forEach(s => console.log(`- ${s.name} - LKR ${s.price}`));
    
    if (services.length === 0) {
      console.log('\nNo services found. Adding sample data...');
      const sampleServices = [
        { name: 'Turbo Engine', description: 'High-performance turbo engine', price: 250000 },
        { name: 'Cold Air Intake', description: 'Performance cold air intake system', price: 35000 },
        { name: 'Exhaust System', description: 'Cat-back exhaust system', price: 85000 },
        { name: 'Lowering Kit', description: 'Adjustable coilover suspension', price: 120000 },
        { name: 'Sway Bars', description: 'Front and rear sway bar kit', price: 45000 },
        { name: 'Body Kit', description: 'Aerodynamic body kit package', price: 180000 },
        { name: 'Spoiler', description: 'Carbon fiber rear spoiler', price: 65000 },
        { name: 'Racing Wheels', description: '18-inch forged racing wheels', price: 200000 },
        { name: 'Performance Tires', description: 'High-grip performance tires', price: 80000 }
      ];
      
      for (let serviceData of sampleServices) {
        const service = new Service(serviceData);
        await service.save();
        console.log(`Added: ${service.name}`);
      }
      console.log('Sample services added successfully!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkServices();