const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require("cors");

const PORT = process.env.PORT || 4000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


// Corrected middleware order

app.use(express.json());
app.use(cors());
// Routes should be defined after middleware

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts" , cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout" , stripeRoute);

app.listen(PORT, () => {
  console.log('Server is running on port 4000');
});











