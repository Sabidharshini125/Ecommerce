const express = require('express');
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get("/", auth, productController.getProducts);
router.post("/", auth, productController.createProduct);

module.exports = router;
