const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
    username:{
        type:String,
        required:[true,'username cannot be Empty'],
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [120, 'Username cannot be more than 120 characters long']
    },
    password:{
        type:String,
        required:[true,'Password cannot be Empty'],
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [120, 'Username cannot be more than 120 characters long']
    },
    email:{
        type:String,
        required:[true,'email cannot be empty'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    role:{
        type:String,
        enum:['User',"Admin"],
        default:'User'
    },
    timeStamp:{
        type:Date,
        default: Date.now
    },
   
})


const UserModel = new Mongoose.model('User',UserSchema)

module.exports = UserModel