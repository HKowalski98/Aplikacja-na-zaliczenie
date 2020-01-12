const router = require('express').Router();

let Product = require('../models/product.model');


//GET app_url/products
router.route('/').get((req, res) => {
    if(req.query.id === undefined){
    Product.find()
    .then(products => res.json(products))
    .catch(err =>  res.status(400).json('Error: ' + err));}
    else{
    Product.findById(req.query.id)
    .then(products => res.json(products))
    .catch(err =>  res.status(400).json('Error: ' + err));
    }
});

/*/GET app_url/products/id
router.route('/').get((req, res) => {
    Product.findById(req.query.id)
    .then(products => res.json(products))
    .catch(err =>  res.status(400).json('Error: ' + err));
});*/

//POST app_url/products
router.route('/').post((req,res,next) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const unit = req.body.unit;
    const category = req.body.category;
    const newProduct = new Product({name, description, price, unit, category});

    newProduct.save()
    .then(() => res.json('Product '+ name + ' added!'))
    .catch(error => {
        res.status(error .status || 500);
        res.json({ 
        error:{
            message: error.message
        }
    })
    });
});

//PUT app_url/products
router.route('/').put((req,res) => {
    Product.findById(req.query.id)
    .then(product => {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = Number(req.body.price);
        product.unit = req.body.unit;
        product.category = req.body.category;

        product.save()
        .then(() => res.json('Product ' + product.name + ' updated'))
        .catch(err => res.status(400).json('Error in updating item: ' + err));
    }).catch(err => res.status(400).json('Error in finding item: ' + err));
});

module.exports = router;
