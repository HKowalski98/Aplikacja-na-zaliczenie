const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const statusSchema = new Schema({
name:{
    type:String,
    required:true
},
lvl:{
    type:Number,
    required:true,
}
});
const  Status = mongoose.model('Status', statusSchema);

module.exports = Status;