const router = require('express').Router();

let Category = require('../models/category.model');

//GET app_url/categories
router.route('/').get((req, res) => {
    Category.find()
    .then(categories => res.json(categories))
    .catch(err =>  res.status(400).json('Error: ' + err));
});

//POST app_url/categories - if user want to add new category
router.route('/').post((req,res) => {
    const name = req.body.name;

    const newCategory = new Category({name});

    newCategory.save()
    .then(() => res.json('Category '+ name + ' added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;