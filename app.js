
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Route Imports
const categoriesRoutes = require('./src/routes/categoriesRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const cartsRoutes = require('./src/routes/cartsRoutes');
const ordersRoutes = require('./src/routes/ordersRoutes');

const app = express();

app.use(express.json());


connectDB();


app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/orders', ordersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing live in ${process.env.NODE_ENV} mode on port ${PORT}`));
