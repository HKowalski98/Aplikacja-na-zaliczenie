const router = require('express').Router();

let Status = require('../models/status.model');

//GET app_url/status
router.route('/').get((req, res) => {
    Status.find()
    .then(status => res.json(status))
    .catch(err =>  res.status(400).json('Error: ' + err));
});

//POST app_url/status - if user want to add new status 
router.route('/').post((req,res) => {
    const name = req.body.name;
    const lvl = req.body.lvl;
    const newStatus= new Status({name,lvl});

    newStatus.save()
    .then(() => res.json('Status '+ name +' with lvl: '+ lvl + ' added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;