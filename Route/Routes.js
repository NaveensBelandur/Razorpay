const Express = require('express')
const Route = Express.Router()
const {Register,ListUser,Login,UserAuth} = require('../Controller/UserController')
const {Checkout,RazorpayResponse} = require('../Controller/CartController')
const Auth = require('../Middleware/Auth')



Route.get('/',(req,res)=>{
    res.send('Hello world')
})
Route.post('/Register',Register)
Route.post('/Login',Login)
Route.get('/User',Auth,UserAuth)
Route.get('/ListUser',Auth,ListUser)

/* Product Checkout Route */
Route.post('/Checkout',Auth,Checkout)
Route.post('/orderDetails',Auth,RazorpayResponse)






module.exports = Route