const User = require('../Model/User')
const JWT = require('jsonwebtoken')

const Auth = async (req,res,next) =>{
    try{
        let token 
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
            
        }else{
            res.status(400).json({
                message:"Invalid Token or Token not found"
            })
        }

        const TokenVerify =  JWT.verify(token,process.env.JWTPWD)
         if(TokenVerify){
           const UserDetails = await User.findById(TokenVerify._id)
           if(UserDetails){
                req.user = UserDetails
                next()
           }
         }else{
            res.status(400).json({
                message:"Token Error"
            })
            throw new TokenErrro('token error')
         }

    }
    catch(error){
        throw new AuthError('Token Error')
    }
}






module.exports = Auth