const User = require('../Model/User')
const Bcrypt = require('bcryptjs')
const JWt = require('jsonwebtoken')
const { Timestamp } = require('mongodb')

const Register = async (req,res) =>{
    try{
     const {username,password,email,role} = req.body
     console.log(username,password,email)

     if(!username || !password || !email){
        res.status(201).json({
            message:"username Cannot be Empty"
        })
        throw new RegisterError('Username cannot be empty')
     }

     const UserExist = await User.findOne({email})
     if(UserExist){
        res.status(201).json({
            message:"User already Exists"
        })
        throw new RegisterError("user Already Exists")
     }


     const salt = await Bcrypt.genSalt(10)
     const Hash = await Bcrypt.hash(password,salt)

    if(Hash){
        const Usersave = await new User({
            username:username,
            password:Hash,
            email:email,
            role:role
        })
          Usersave.save()
        if(Usersave){
            res.status(200).json({
                Usersave,
                Token:generateToken(Usersave._id)
            })
        }else{
            res.status(400).json({
                message:"Error in Register"
            })
        }
    }


    }
    catch(error){
        throw new UserError(error.message)
    }
}


const ListUser = async (req,res) =>{
    try{
     const GetUSer = await User.find()
     if(GetUSer){
        res.status(200).json(GetUSer)
     }else{
        res.status(201).json('User Not Found')
     }

    }
    catch(err){
        throw new Error(err.message)
    }
}



const Login = async (req,res)=>{
    try{
    const {email,password} = req.body
    if(!email || !password){
       res.status(500).json({
        message:"email or password cannot be empty"
       })
    }

    const passwordCheck = await User.findOne({email})

    if(passwordCheck){
        const Passwordcompare = await Bcrypt.compare(password,passwordCheck.password)
        if(Passwordcompare){
            res.status(200).json({
                passwordCheck,
                Token:generateToken(passwordCheck._id)
            })
        }else{
            res.status(500).json({
                message:"Password Doest Match Error"
            })
        }
    }
    }
    catch(err){
        throw new LoginError('Login Error')
    }
}


const UserAuth = async(req,res) =>{
    try{
      const user = req.user
      if(user){
        res.status(200).json(user)
      }else{
        res.status(400).json('user not found')
      }
    }
    catch(error){
        console.log(error.message)
        throw new userError(error.message)
    }
}

const generateToken = (_id) =>{
    return JWt.sign({_id},process.env.JWTPWD)
}


module.exports = {
    Register,
    ListUser,
    Login,
    UserAuth
}