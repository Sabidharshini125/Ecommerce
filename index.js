const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://root:root@clustersabi.1hjslfw.mongodb.net/e_commerce", { 
    
})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Database connection error: ", err);
    });

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
