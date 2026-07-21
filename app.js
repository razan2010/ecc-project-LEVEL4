require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

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

// FAILSAFE BOUNDS: Mounts both versions so it works perfectly no matter what you type!
app.use('/api/orders', ordersRoutes);
app.use('/api/order', ordersRoutes);

app.use((req, res, next) => {
  const AppError = require('./src/utils/customErrors');
  next(new AppError(`The requested URL ${req.originalUrl} was not found on this server.`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing live in ${process.env.NODE_ENV} mode on port ${PORT}`));
