
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
approvalDate:{
    type:Date,
    default: undefined
},
orderStatus:{
    type:String,
    default:"NOT APPROVED"
},
orderStatusLvl:{
    type:Number,
    default:1
},
username:{
    type:String,
    required:[true, "Username is required when creating an order"]
},
email:{
    type:String,
    required:[true, "E-mail is required when creating an order"],
    validate: {
        validator: function(v) {
          return /[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,}/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
    required:true
},
phoneNumber:{
    type:String,
    validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{3}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    required:true
},
order:{ // bedzie to mapa w postaci  [nazwa towaru] : [ilosc jednostek]
    type:Map,
    of:Number,
    validate: {
        validator: function(v) {
           
        },
        message: props => `${props.v}`
      },
} 
});
const  Order = mongoose.model('Order', orderSchema);

module.exports = Order;