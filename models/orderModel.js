const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customer_name: { type: String, required: true },
    customer_address: { type: String, required: true },
    customer_phone: { type: String, required: true },
    email: { type: String, required: true },
    products: [
        {
            product_id: String, 
            quantity: Number,
            price: Number
        }
    ],
    order_date: { type: Date, default: Date.now },
    estimated_delivery_date: { type: Date },
    subtotal: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
