const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/create', auth, orderController.createOrder);
router.get('/get', auth, orderController.getOrders); 

module.exports = router;
