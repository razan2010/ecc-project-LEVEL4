this is the link:https://github.com/razan2010/ecc-project-LEVEL4
# E-Commerce Backend REST API Engine

A complete, robust, and production-ready modular MVC backend engineering architecture for managing digital marketplace categories, localized products catalog items, customer shopping baskets, and automated purchase checkout systems. Built as a term final capstone project.

A short description: This API serves as a completely unified, secure commerce processing gate. It handles structural schema validation constraints, real-time product warehouse inventory deductions, dynamic pricing calculators, automated URL parameters text keyword search engines, and full relational data model document populations.

### Core Tech Stack
* **Runtime Environment**: Node.js (v24.18.0)
* **Web Framework**: Express.js (v5.2.1)
* **Database Driver**: MongoDB Atlas & Mongoose ODM (v9.7.3)
* **Input Validation Security**: Express-Validator (v7.3.2)

---

## 2. Project Core Features
* **Categories API**: Complete operational CRUD data routing pathways alongside pre-save lifecycle middleware hooks for auto-generating lowercase web-friendly tracking URL slugs.
* **Products API**: Advanced native array filtering systems supporting multiple URL query parameters simultaneously (`search`, `minPrice`, `maxPrice`, `inStock`) and complete Mongoose relational schema document population logic.
* **Cart API**: Live computational basket pipelines managing dynamic totals tracking, safe database-driven item pricing lookups, stock availability checks, and automatic item removals if quantity levels drop down to `0`.
* **Orders API**: Automated generation of alphanumeric tracking codes, static snapshot isolation records, transactional inventory subtractions, and comprehensive error handling wrappers.

---

## 3. System Prerequisites
* **Node.js**: Installed locally on your computer engine workstation.
* **MongoDB**: A live active database connection (Local server connection or an authenticated MongoDB Atlas Cluster Shard connection layout string).
* **Package Manager**: npm or yarn terminal utilities active.

---

## 4. Step-by-Step Installation & Setup
Follow these exact sequential terminal commands to clone, deploy, populate, and execute this backend application workspace locally:

```bash
# 1. Clone the project live repository down from the cloud
git clone https://github.com

# 2. Navigate straight into your extracted repository root directory path
cd ecc-project

# 3. Download and install all required framework tracking packages and dependencies
npm install

# 4. Execute the automated data seeding tool to populate your database tables cleanly
npm run seed

# 5. Fire up the live application server gate runner script
npm start
```

---

## 5. Local Environment Configurations Notebook
Create an environment file named `.env` inside your project root folder directory containing these exact required configuration parameters keys:

| Environment Key Variable | Example Setting Value | Operational Technical Description Purpose |
| :--- | :--- | :--- |
| `PORT` | `5000` | The digital network channel port communication link your server monitors for traffic. |
| `NODE_ENV` | `development` | Tracks application operational execution states (e.g. development vs production parameters). |
| `MONGO_URI` | `mongodb://...` | The direct securely authenticated connection hook string routing straight to your database cluster. |

---

## 6. Complete API Endpoints Roadmap Sheet (Postman Direct Inputs)

Since this version does not implement dynamic Postman environment environment file parameters variables tracking configurations, use these exact, literal hardcoded URL strings directly inside your testing panels:

### Categories Routing Matrix
* **`POST http://localhost:5000/api/categories`**
  * *Description*: Generates a clean new business product category layout card entry. Expects `name` and `description` inside your JSON body block.
* **`GET http://localhost:5000/api/categories`**
  * *Description*: Pulls the complete array list of all stored category records from the database table.
* **`GET http://localhost:5000/api/categories/6a5b259084e19a24b526c297`**
  * *Description*: Fetches a single isolated product category entry profile card by appending its 24-character hex ID string onto the path.
* **`PATCH http://localhost:5000/api/categories/6a5b259084e19a24b526c297`**
  * *Description*: Runs partial attribute modification update edits on name/description values by specific target ID tracking.
* **`DELETE http://localhost:5000/api/categories/6a5b259084e19a24b526c297`**
  * *Description*: Removes a target category completely from the database tracking logs.

### Products Routing Matrix
* **`POST http://localhost:5000/api/products`**
  * *Description*: Creates an active market inventory item card with required description text, strict formatting price constraints, stock tracking caps, and verified category identity maps.
* **`GET http://localhost:5000/api/products`**
  * *Description*: Fetches your entire raw product inventory records catalog array list.
* **`GET http://localhost:5000/api/products?search=iPhone`**
  * *Description*: Filter Query: Searches through item names and descriptions to perfectly isolate matching keywords.
* **`GET http://localhost:5000/api/products?minPrice=20&maxPrice=100&inStock=true`**
  * *Description*: Filter Query: Multi-variable constraint tracking checking price boundaries and storage availability flags.
* **`GET http://localhost:5000/api/products/6a5b259184e19a24b526c299`**
  * *Description*: Advanced population detail query fetching one specific item product card and expanding its category data object fields fully to print description parameters strings.
* **`PUT http://localhost:5000/api/products/6a5b259184e19a24b526c299`**
  * *Description*: Modifies warehouse product attributes, stocks numbers, and descriptions logs safely.
* **`DELETE http://localhost:5000/api/products/6a5b259184e19a24b526c299`**
  * *Description*: Permanently deletes an item from your database inventory list.

### Shopping Carts Routing Matrix
* **`POST http://localhost:5000/api/carts/items`**
  * *Description*: Adds item rows to user shopping baskets. Securely extracts pricing logs directly out of database documents instead of reading client inputs bodies for safety.
* **`GET http://localhost:5000/api/carts?userId=customer_99`**
  * *Description*: Fetches the current populated checkout cart data block holding calculated total cost balances values.
* **`PUT http://localhost:5000/api/carts/items/6a5b259184e19a24b526c299`**
  * *Description*: Modifies line quantities. Automatically drops rows from array storage bounds if quantity hits `0`.
* **`DELETE http://localhost:5000/api/carts/items/6a5b259184e19a24b526c299`**
  * *Description*: Unlinks a single product row string completely from a shopper's basket layout.
* **`DELETE http://localhost:5000/api/carts`**
  * *Description*: Wipes an entire basket list array flat and completely sets `totalPrice` back to `0`.

### Purchases & Orders Routing Matrix
* **`POST http://localhost:5000/api/orders`**
  * *Description*: Compiles checkout data, runs math multiplication equations, subtracts physical warehouse stocks quantities, sets default statuses to lowercase `pending`, logs delivery data matrices, and removes active carts tables.
* **`GET http://localhost:5000/api/orders`**
  * *Description*: Fetches all past logged order tracking transactions data objects histories (Admin dashboard view).
* **`GET http://localhost:5000/api/orders/6a5c314084e19b12c823f41a`**
  * *Description*: Displays a single structural order billing invoice record parameter profile.
* **`PATCH http://localhost:5000/api/orders/6a5c314084e19b12c823f41a/status`**
  * *Description*: Updates shipping milestones status parameters metrics using strict lowercase validation enum tokens (`confirmed`, `shipped`, `delivered`, `cancelled`).

---

## 7. Modular System Architecture Directory Tree
```text
ecommerce-project-workspace/
├── postman/
│   └── E-Commerce API Dev.postman_collection.json # Exported verification testing collection
├── src/
│   ├── config/
│   │   └── db.js            # Mongoose MongoDB link server bridge handshake script
│   ├── controllers/
│   │   ├── categoriesController.js # Handles slug creation, read, updates, and deletes
│   │   ├── productsController.js   # Manages filters querying parsing, regex keyword checking, routes populating
│   │   ├── cartsController.js      # Processes basket arrays calculations, price locks, 0-quantity removals
│   │   └── ordersController.js     # Triggers transactions logs compilation, tracking code generation
│   ├── middleware/
│   │   └── errorHandler.js   # Intercepts CastErrors, ValidationErrors, custom exceptions cascades
│   ├── models/
│   │   ├── Category.js      # Structural category schemas rules holding lowercase slug generation hooks
│   │   ├── Product.js       # Core storage blueprints deploying virtual 'inStock' attributes
│   │   ├── Cart.js          # Shopping basket structures caching user totals and item rates
│   │   └── Order.js         # Invoice database specifications locking static price snapshots records
│   ├── routes/
│   │   ├── categoriesRoutes.js # Directs client URL endpoints mapping for categorizations
│   │   ├── productsRoutes.js   # Directs traffic for product queries, updates, lookups
│   │   ├── cartsRoutes.js      # Routes basket line adjustments and array clearances
│   │   └── ordersRoutes.js     # Routes checkout pipelines execution commands and status adjustments
│   ├── utils/
│   │   ├── customErrors.js   # Clean JavaScript inheritance object class extending native operational errors
│   │   ├── asyncHandler.js   # Automated safety net promise wrapper removing raw try-catch duplications
│   │   ├── priceCalculator.js# Computes core mathematical multiplication pricing scales securely
