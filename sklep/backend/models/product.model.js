const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    name:{
        type:String,
        required: [true, "Product Name is required "],
        trim: true,
    },
    description:{
        type:String,
        required: [true, "Product Description is required "],
        trim: true,
    },
    price:{
        type: Number,
        required:[true, "Product Price is required "],
        min:[0.01,"Price cannot be less than 0.01"]
    },
    unit:{
        type:String,
        required:[true, "Unit is required "],
        minlength:1
    },
    category:{
        type:String,
        required:false,
        minlength:3
    }
    },{
    timestamps :true,
});

const  Product = mongoose.model('Product', productSchema);

module.exports = Product;