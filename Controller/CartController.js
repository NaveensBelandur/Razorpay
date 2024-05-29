const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: process.env.Key_ID, key_secret: process.env.Key_SECRET })
const OrderId = require('../Model/cart')
const RazorPaySave = require('../Model/Razorpay')

const Checkout = async (req, res) => {
    try {
        const user = req.user;
        const { cartValue } = req.body;

        const MINIMUM_CART_VALUE = 100; 
        if (!cartValue) {
            return res.status(202).json({
                message: 'Cart value cannot be empty'
            });
        }

        if (cartValue < MINIMUM_CART_VALUE) {
            return res.status(400).json({
                message: `Cart value must be at least ${MINIMUM_CART_VALUE / 100} INR`
            });
        }

        const ReceiptName = Math.round(Math.random() * 1000);
        var options = {
            amount: cartValue,
            partial_payment: false,
            currency: "INR",
            receipt: `Ordered_${ReceiptName}`,
            notes: {
                message: "Order Created Successfully"
            }
        };

        instance.orders.create(options, async function(err, order) {
            if (order) {
                const checkoutData = await new OrderId({
                    User: user,
                    cartValue: order.amount,
                    orderId: order.id,
                    receipt: order.receipt,
                    status: true,
                    created_at: order.created_at
                });
                await checkoutData.save();
                res.status(200).json(checkoutData);
            } else {
                res.status(400).json({
                    message: 'Payment Error',
                    error: err ? err.message : 'Unknown error'
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
};



const RazorpayResponse = async (req,res) =>{
    try{
     const users = req.user
     const { razorpaypaymentid,razorpayorderid,razorpaysignature} = req.body
      if(users){
        const razorpaysave = await new RazorPaySave({
            User:users,
            razorpaypaymentid:razorpaypaymentid,
            razorpayorderid:razorpayorderid,
            razorpaysignature:razorpaysignature,
            success:true,
        })
        razorpaysave.save()
        if(razorpaysave){
            res.status(200).json(razorpaysave)
        }
      }
    }
    catch(err){
        throw new Error('Error in saving the data')
    }
}


module.exports = {
    Checkout,
    RazorpayResponse
}