const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signup_data = new Schema( {
     name:{ type:String , required:true },
     email:{ type:String , required:true },
     password:{ type:String , required:true },
     mobile_number:{ type:Number , required: true }
},
  { collection:"user-signup-data"}
)

module.exports = mongoose.model('signup_data' , signup_data )