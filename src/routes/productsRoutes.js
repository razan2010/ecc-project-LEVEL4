const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productsController');
const { productSchema } = require('../validators/productValidator');
const validate = require('../utils/validate');

router.post('/', productSchema, validate, createProduct);
router.get('/', getProducts);

module.exports = router;
