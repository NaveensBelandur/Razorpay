const Mongoose = require('mongoose')

const CartSchema = new Mongoose.Schema({
       User:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User Cannot be empty']
       },
      cartValue:{
        type:String,
        required:[true,"Cart Value cannot be empty"]
      },
      orderId:{
        type:String,
        required:[true,'OrderId Cannot be empty']
      },
      receipt:{
        type:String,
        required:[true,'Receipt cannot be empty']
      },
      status:{
        type:Boolean,
        default:false
      },
      created_at:{
        type:String,
        default:Date.now
      }
})



const OrderId = new Mongoose.model("Cart",CartSchema)


module.exports = OrderId