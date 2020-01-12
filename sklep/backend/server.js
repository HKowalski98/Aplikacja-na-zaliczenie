const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');
const statusRouter = require('./routes/status')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;


connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully")
})

app.use(cors());
app.use(express.json());

app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/status', statusRouter);

app.use ((req,res,next) =>{
    const error = new Error('Not found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error .status || 500);
    res.json({ 
        error:{
            message: error.message
        }
    })
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});