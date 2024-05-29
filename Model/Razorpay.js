const Mongoose = require('mongoose')

const Razorpay = new Mongoose.Schema({
    User:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'User Cannot be empty']
       },
       razorpaypaymentid:{
        type:String
       },
       razorpayorderid:{
        type:String
       },
       razorpaysignature:{
        type:String
       },
       success:{
        type:Boolean,
        default:false
       },
       createdAt:{
        type:Date,
        default:Date.now
       }
})

const RazorPaySave = new Mongoose.model('Razorpay',Razorpay)

module.exports = RazorPaySave