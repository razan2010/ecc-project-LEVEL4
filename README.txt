this is the link:https://github.com/razan2010/ecc-project3

# E-Commerce Backend API

A complete, production-ready modular MVC backend engine for managing e-commerce categories, products, carts, and orders using Node.js, Express, and Mongoose.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Validation**: Express-Validator

## Prerequisites
- Node.js installed
- MongoDB installed 

## Installation & Setup
1. Clone this repository to your local machine.
2. Run `npm install` to load all project dependencies.
3. Set up your local environments by copying `.env.example` into a new `.env` file.
4. Run `node seed.js` to clear and instantly populate the database with test products.
5. Run `node app.js` to execute the server live.


## API Endpoints Roadmap

### Categories
- `POST /api/categories` - Create a new category
- `GET /api/categories` - Fetch all categories

### Products
- `POST /api/products` - Create a product with stock allocation
- `GET /api/products` - View all products (Supports `?category=` and `?maxPrice=` query filters)
- `PUT /api/products/:id` - Modify an existing product
- `DELETE /api/products/:id` - Delete a product completely

### Shopping Cart
- `POST /api/carts/add` - Add item units to cart (with real-time stock checks)
- `GET /api/carts/:userId` - Retrieve whole cart contents (populated details)
- `PUT /api/carts/update-quantity` - Modify item line quantity choices
- `DELETE /api/carts/remove-item` - Remove single row item completely
- `POST /api/carts/clear` - Empty whole cart selection instantly

### Orders
- `POST /api/orders/checkout` - Finalize checkout with dynamic item quantity cost multiplication math
- `GET /api/orders` - Read all customer orders logged (Admin feature)
- `PUT /api/orders/:id/status` - Update an order fulfillment state (Admin feature)
