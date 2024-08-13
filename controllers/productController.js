const Product = require("../models/productModel");
const { v4: uuidv4 } = require('uuid');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.createProduct = async (req, res) => {
    const { title, price, description, category, image, rating } = req.body;
    const newProduct = new Product({
        id: uuidv4(),
        title,
        price,
        description,
        category,
        image,
        rating
    });

    try {
        await newProduct.save();
        res.status(200).json("Product created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to create product" });
    }
};
