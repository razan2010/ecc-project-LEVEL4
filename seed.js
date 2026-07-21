require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');

const seedDatabase = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://razan:0000@ac-clkxdl8-shard-00-00.fb3b2nh.mongodb.net:27017,ac-clkxdl8-shard-00-01.fb3b2nh.mongodb.net:27017,ac-clkxdl8-shard-00-02.fb3b2nh.mongodb.net:27017/?ssl=true&replicaSet=atlas-zlba49-shard-0&authSource=admin&appName=Cluster0');
    console.log('Seed: Connected to Database...');

  
    await Product.deleteMany();
    await Category.deleteMany();
    console.log('Seed: Old data cleared.');

    
    const electronics = await Category.create({ name: 'Electronics', description: 'Tech and gadgets' });
    const clothing = await Category.create({ name: 'Clothing', description: 'Apparel and styles' });
    const homeLiving = await Category.create({ name: 'Home & Living', description: 'Furniture and decor' });

    
    const productsData = [
      { name: 'iPhone 14', description: 'Apple smartphone', price: 899, stock: 50, category: electronics._id },
      { name: 'Dell Laptop', description: 'Workstation laptop', price: 999, stock: 7, category: electronics._id },
      { name: 'Men T-Shirt', description: 'Cotton basic tee', price: 29, stock: 25, category: clothing._id },
      { name: 'Blue Jeans', description: 'Denim slim fit jeans', price: 50, stock: 15, category: clothing._id },
      { name: 'Sofa', description: 'Comfortable living room couch', price: 399, stock: 5, category: homeLiving._id },
      { name: 'Table Lamp', description: 'Modern desk lighting', price: 49, stock: 20, category: homeLiving._id }
    ];

    const insertedProducts = await Product.create(productsData);

    // 5. Show success message & Print counts of items inserted
    console.log('Database Seeding Complete! 🌱');
    console.log(`Successfully inserted 3 categories.`);
    console.log(`Successfully inserted ${insertedProducts.length} products.`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    // 6. Disconnect from DB cleanly
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
};

seedDatabase();
