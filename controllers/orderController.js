const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');
exports.createOrder = async (req, res) => {
    const { user_id } = req.user;
    const { customer_name, customer_address, customer_phone } = req.body;

    try {
        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        let subtotal = 0;
        const products = await Promise.all(
            cart.products.map(async (product) => {
                const productDetails = await Product.findOne({ id: product.product_id }); // Match the product_id type
                if (productDetails) {
                    subtotal += productDetails.price * product.quantity;
                    return {
                        product_id: productDetails.id,
                        quantity: product.quantity,
                        price: productDetails.price
                    };
                }
                return null;
            })
        );

        const order = new Order({
            user_id :uuidv4(),
            customer_name,
            customer_address,
            customer_phone,
            email: req.user.email,
            products: products.filter(p => p !== null),
            subtotal,
            estimated_delivery_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
        });

        await order.save();

        await Cart.deleteOne({ user_id });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    const { user_id } = req.user;

    try {
        const orders = await Order.find({ user_id });

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
