this is the link:https://github.com/razan2010/ecc-project-LEVEL4
# E-Commerce Backend REST API Engine

A complete, robust, and production-ready modular MVC backend engineering architecture for managing digital marketplace categories, localized products catalog items, customer shopping baskets, and automated purchase checkout systems.

This API serves as a unified, secure commerce processing gate. It handles structural schema validation constraints, real-time product warehouse inventory deductions, dynamic pricing calculators, automated URL parameters text keyword search engines, and full relational data model document populations.

### Tech Stack & Core Modules
* **Runtime Environment**: Node.js (v24.18.0)
* **Web Framework**: Express.js (v5.2.1)
* **Database Driver**: MongoDB Atlas & Mongoose ODM (v9.7.3)
* **Input Validation Security**: Express-Validator (v7.3.2)
* **Injection Firewall**: Mongo-Sanitize (v1.1.0)

---

## 2. Project Core Features
* **Categories API**: Complete operational CRUD data routing pathways alongside pre-save lifecycle middleware hooks for auto-generating lowercase web-friendly tracking URL slugs.
* **Products API**: Advanced native array filtering systems supporting multiple URL query parameters simultaneously (`search`, `minPrice`, `maxPrice`, `inStock`) and complete Mongoose relational schema document population logic.
* **Cart API**: Live computational basket pipelines managing dynamic totals tracking, safe database-driven item pricing lookups, stock availability checks, and automatic item removals if quantity levels drop down to `0`.
* **Orders API**: Automated generation of unique alphanumeric tracking codes, static snapshot isolation records, transactional inventory subtractions, and comprehensive error handling wrappers.

---

## 3. Prerequisites
* **Node.js**: Installed locally on your computer engine workstation.
* **MongoDB**: A live active database connection (Local server connection or an authenticated MongoDB Atlas Cluster Shard connection layout string).
* **Package Manager**: npm terminal utilities active.

---

## 4. Installation Steps
Follow these exact sequential terminal commands to clone, deploy, configure, populate, and execute this backend application workspace locally:

```bash
git clone https://github.com
cd ecommerce-final
npm install
touch .env
npm run seed
npm start
```

---

## 5. Environment Variables Table
Create your local environment file named `.env` inside your project root folder directory containing these exact required configuration parameters keys:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `PORT` | The digital network channel port communication link your server monitors for traffic. | `5000` |
| `NODE_ENV` | Tracks application operational execution states (development vs production mode). | `development` |
| `MONGO_URI` | The securely authenticated connection string routing straight to your database cluster. | `mongodb+srv://razan:0000@cluster0...` |

---

## 6. API Endpoints Roadmap Sheet

### Categories API Matrix
* **`POST /api/categories`** - Generates a clean new business product category layout card entry.
* **`GET /api/categories`** - Pulls the complete array list of all stored category records from the database table.
* **`GET /api/categories/:id`** - Fetches a single isolated product category entry profile card by its 24-character hex ID string.
* **`PATCH /api/categories/:id`** - Runs partial attribute modification update edits on name/description values.
* **`DELETE /api/categories/:id`** - Removes a target category completely from the database tracking logs.

### Products API Matrix
* **`POST /api/products`** - Creates an active market inventory item card with required description text and strict formatting constraints.
* **`GET /api/products`** - Fetches your entire raw product inventory records catalog array list.
* **`GET /api/products?search=iPhone`** - Filter Query: Searches through item names and descriptions to perfectly isolate matching keywords.
* **`GET /api/products?minPrice=20&maxPrice=100&inStock=true`** - Filter Query: Multi-variable constraint tracking checking price boundaries and storage availability flags.
* **`GET /api/products/:id`** - Advanced population detail query fetching one specific item product card and expanding its category data object fields fully.
* **`PUT /api/products/:id`** - Modifies warehouse product attributes, stocks numbers, and descriptions logs safely.
* **`DELETE /api/products/:id`** - Permanently deletes an item from your database inventory list.

### Shopping Carts API Matrix
* **`POST /api/carts/items`** - Adds item rows to user shopping baskets.
* **`GET /api/carts`** - Fetches the current populated checkout cart data block holding calculated total cost balances values.
* **`PATCH /api/carts/items/:productId`** - Modifies line quantities. Automatically drops rows from array storage bounds if quantity hits `0`.
* **`DELETE /api/carts/items/:productId`** - Unlinks a single product row string completely from a shopper's basket layout.
* **`DELETE /api/carts`** - Wipes an entire basket list array flat and completely sets `totalPrice` back to `0`.

### Purchases & Orders API Matrix
* **`POST /api/orders`** - Compiles checkout data, runs math calculations, subtracts warehouse stocks, and clears active carts.
* **`GET /api/orders`** - Fetches all past logged order tracking transactions data objects histories.
* **`GET /api/orders/:id`** - Displays a single structural order billing invoice record parameter profile.
* **`PATCH /api/orders/:id/status`** - Updates shipping milestones status parameters metrics using strict lowercase validation enum tokens (`confirmed`, `shipped`, `delivered`, `cancelled`).

---

## 7. Project Structure
```text
ecommerce-project-workspace/
├── postman/
│   └── E-Commerce API Dev.postman_collection.json
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── categoriesController.js
│   │   ├── productsController.js
│   │   ├── cartsController.js
│   │   └── ordersController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── categoriesRoutes.js
│   │   ├── productsRoutes.js
│   │   ├── cartsRoutes.js
│   │   └── ordersRoutes.js
│   ├── utils/
│   │   ├── customErrors.js
│   │   ├── asyncHandler.js
│   │   ├── priceCalculator.js
│   │   └── validate.js
│   └── validators/
│       ├── cartValidator.js
│       ├── categoryValidator.js
│       ├── orderValidator.js
│       └── productValidator.js
├── .env
├── .env.example
├── .gitignore
├── app.js
└── seed.js
```
