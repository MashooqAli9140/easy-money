const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stocks_data = new Schema(
    {
     symbol:{ type:String , required:true },
     high:{ type:Number , required:true },
     low:{ type:Number , required:true },
     close:{ type:Number , required: true }
   },
   { collection:"Stock_data"}
)

module.exports = mongoose.model('stocks_schema' , Stocks_data )