require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://razan:0000@ac-clkxdl8-shard-00-00.fb3b2nh.mongodb.net:27017,ac-clkxdl8-shard-00-01.fb3b2nh.mongodb.net:27017,ac-clkxdl8-shard-00-02.fb3b2nh.mongodb.net:27017/?ssl=true&replicaSet=atlas-zlba49-shard-0&authSource=admin&appName=Cluster0);')
    console.log('Seed: Connected to Database...');

    // Clear old data to start fresh
    await Category.deleteMany();
    await Product.deleteMany();
    console.log('Seed: Old data cleared.');

    // 1. Insert Categories
    const electronics = await Category.create({ name: 'Electronics', description: 'Tech Gadgets' });
    const clothing = await Category.create({ name: 'Clothing', description: 'Apparel and Styles' });
    console.log('Seed: Categories created successfully.');

    // 2. Insert Products linking to Category IDs
    await Product.create([
      { name: 'Smartphone Pro', price: 999, countInStock: 10, category: electronics._id },
      { name: 'Wireless Earbuds', price: 149, countInStock: 25, category: electronics._id },
      { name: 'Running Shoes', price: 85, countInStock: 15, category: clothing._id },
      { name: 'Cotton T-Shirt', price: 25, countInStock: 50, category: clothing._id }
    ]);

    console.log('Seed: Products populated successfully.');
    console.log('Database Seeding Complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
