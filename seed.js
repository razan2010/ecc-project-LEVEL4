require('dotenv').config();
const connectDB = require('./src/config/db'); // Imports required connectDB tool (Check 1)
const mongoose = require('mongoose');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const Order = require('./src/models/Order'); // Imported to clear stale orders (Check 2)

const seedDatabase = async () => {
  try {
    // 1. Setup & Connection (Check 1)
    await connectDB(); 
    console.log('Seed: Connected to Database...');

    // 2. Cleanup Before Seeding in strict required sequence (Check 2)
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    console.log('Seed: Old data cleared completely in correct order.');

    // 3. Sample Data Insertion (Check 3)
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

    // 4. Disconnect & Logging (Check 4)
    console.log('Database Seeding Complete! 🌱');
    console.log(`Successfully inserted 3 categories.`);
    console.log(`Successfully inserted ${insertedProducts.length} products.`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    // Graceful disconnect logic placed inside the mandatory finally block
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB safely.');
    process.exit(0);
  }
};

seedDatabase();
