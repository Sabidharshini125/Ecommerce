const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rate: Number,
    count: Number
});

const productSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    rating: ratingSchema
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
