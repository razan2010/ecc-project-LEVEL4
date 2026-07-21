const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  getProducts, 
  getProductById,
  updateProduct, 
  deleteProduct 
} = require('../controllers/productsController');
const { productSchema } = require('../validators/productValidator');
const validate = require('../utils/validate');
router.post('/', productSchema, validate, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', productSchema, validate, updateProduct);
router.delete('/:id', deleteProduct);
module.exports = router;
