const router = require('express').Router();

let Order = require('../models/order.model');

//GET app_url/orders
router.route('/').get((req, res) => {
    Order.find()
    .then(orders => res.json(orders))
    .catch(err =>  res.status(400).json('Error: ' + err));
});

//POST app_url/orders
router.route('/').post((req,res) => {
    const approvalDate = null;
    const orderStatus = req.body.orderStatus;
    const orderStatusLvl = req.body.orderStatusLvl
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const order = req.body.order;

    const newOrder = new Order({approvalDate, orderStatus, orderStatusLvl, username, email, phoneNumber, order});

    newOrder.save()
    .then(() => res.json('Order from '+ username + ' added!'))
    .catch(error => {
        res.status(error.status || 500);
        res.json({ 
        error:{
            message: error.message
        }
    })
    });
});

//PUT app_url/orders/id/status
router.route('/').put((req,res) => {
    Order.findById(req.query.id)
    .then(order => {
    let tmpOrderStatus;
    if(order.approvalDate === null && order.orderStatus === "NOT APPROVED")
    order.approvalDate = new Date();
    if(order.orderStatus === "CANCELLED"){
        throw new Error("Status of CANCELLED order cannot be changed");
    }
    if(req.query.status === 'CANCELLED'){
         tmpOrderStatus = 3;
    }
    else if(req.query.status === 'COMPLETED'){
         tmpOrderStatus= 3;
    }
    else if(req.query.status === 'APPROVED'){
         tmpOrderStatus = 2;
    }
    else if(req.query.status === 'NOT APPROVED'){
         tmpOrderStatus = 1;
    }
    if(order.orderStatusLvl > tmpOrderStatus){
        throw new Error(`Status cannot be cancelled from ${order.orderStatus} to ${req.query.status}`);
    }
    order.orderStatusLvl = tmpOrderStatus;
    order.orderStatus = req.query.status;
    order.username = req.body.username;
    order.email = req.body.email;
    order.phoneNumber = req.body.phoneNumber;
    order.order = req.body.order;

    order.save()
    .then(() => res.json('Order UPDATED!'))
    .catch(err => res.status(400).json(''+err));
}).catch(err => res.status(400).json('Error in finding' + err));
});


//GET app_url/orders/status
router.route('/:status').get((req, res) => {
    Order.findOne({orderStatus:req.query.status})
    .then(orders => res.json(orders))
    .catch(err =>  res.status(400).json('Error: ' + err));
});

module.exports = router;