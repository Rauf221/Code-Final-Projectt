const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require('./connection');
const authRouter = require("./Routes/authentication");
const userRouter = require("./Routes/users");
const productRoutes=require("./Routes/product");
const RecommendedRourtes=require("./Routes/productsForRecommended");
const filterProductsRoutes=require("./Routes/filterProductsRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const postRoutes = require('./Routes/blogRoutes');
const commentRoutes = require('./Routes/commentRoutes');
const stripeRoutes = require('./Routes/stripeRoutes');



dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/api/filter-products', filterProductsRoutes);
app.use('/api', productRoutes, RecommendedRourtes);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use('/api/contacts', contactRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', commentRoutes);
app.use('/api/stripe', stripeRoutes);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        status: errorStatus,
        message: errorMessage,
        success: false,
        stack: err.stack
    });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const url = process.env.CONNECTION_URL;
connectMongoDb(url);
