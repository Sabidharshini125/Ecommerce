const express = require('express');
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/add', auth, cartController.createCart);
router.get('/get', auth, cartController.getCart);
router.delete('/delete/:id', auth, cartController.deleteCartProduct);

module.exports = router;
