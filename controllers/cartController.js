const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createCart = async (req, res) => {
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({
                user_id,
                products: [{ product_id, quantity }],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (prod) => prod.product_id === product_id
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({ product_id, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Product added/updated in cart", cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getCart = async (req, res) => {
    const { user_id } = req.user;

    try {
        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        let subtotal = 0;
        const CartItems = await Promise.all(
            cart.products.map(async (product) => {
                
                const productDetails = await Product.findOne({ id: product.product_id });
                if (!productDetails) {
                    return null;
                }
                subtotal += productDetails.price * product.quantity;
                return {
                    product_id: product.product_id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image,
                    quantity: product.quantity,
                };
            })
        );

       
        const filteredCartItems = CartItems.filter(item => item !== null);

        res.status(200).json({ CartItems: filteredCartItems, subtotal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

exports.deleteCartProduct = async (req, res) => {
    const { user_id } = req.user;
    const product_id = req.params.id;







    try {
        const cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        console.log("Cart found:", cart);

        const productIndex = cart.products.findIndex(
            (product) => product.product_id === product_id
        );

        console.log("Product ID to delete:", product_id);
        console.log("Product IDs in cart:", cart.products.map(p => p.product_id));

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.products.splice(productIndex, 1); // Remove the product from the cart

        if (cart.products.length === 0) {
            await Cart.deleteOne({ user_id });
            return res.status(200).json({ message: "Cart deleted successfully" });
        } else {
            await cart.save();
            return res.status(200).json({ message: "Product removed from cart successfully" });
        }
    } catch (err) {
        console.error("Error in deleteCartProduct:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
