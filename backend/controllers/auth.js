const {User} = require("../models/User")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

const createToken = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn: 1* 24 * 60 * 60 })
}

const signUp = async (req, res)=>{
    
    try {
      console.log(req.body)
        const errors = await validationResult(req)
        if(!errors.isEmpty()){  
            return res.status(200).json({
                error: 0,
                message : errors.array()[0].msg
            })
        }
        
        const user = await User.findOne({email : req.body.email})
        if(user){
            return res.status(200).json({
                error:0,
                message: "User already exist,try another email "
            })
        }
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        // res.status(200).json(savedUser)
        res.status(200).json({
            error:0,
            message: 'Successfully Registered '
        })
    } catch (err) {
       
        res.status(400).json({message: "Found some error"})
    }
}

const signIn = async (req, res)=>{
    const errors = await validationResult(req)
    if(!errors.isEmpty()){
        return res.status(200).json({
            error: 0,
            message : errors.array()[0].msg
        })
    }
    
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return res.status(200).json({
            error: 0,
            message: "Please check your email "
        })
    }
        const userPassword = await User.authenticate(req.body.email, req.body.password)
        if(userPassword){
             const token = createToken(userPassword._id)
             res.cookie("token", token,{httpOnly: true,maxAge: 1*24*60*60*1000})
             res.status(200).json({
                 token,
                 user:{
                     id: userPassword._id,
                     email: userPassword.email,
                     name: userPassword.name,
                     role: userPassword.role
                 }
             })

        }else{
            res.status(400).json({
                error:1,
                message : "password doesn't matched"
            })
        }
}

const isSignin =(req, res, next)=>{
    
        const token = req.cookie.token;
        if(token){
           
            const user = jwt.verify(token, process.env.SECRET_KEY, (err,decodedtoken)=>{  //we sent id from jwt sign
                if(err){
                    res.status(400).json({
                        error : "unauthorized token"
                    })
                } 
               
                 req.auth = decodedtoken
                  next()
             
            })

        }else{
            res.status(400).json({
                error : "Token Not Found"
            })
        }
     
}

// //custom middleware
const isAuthenticated = (req, res, next) => {

    /* profile is being set up from the frontend (REACT) and auth is being set up from isSignin */
    let checker = req.profile && req.auth && req.profile._id == req.auth.id
    if (!checker) {
        return res.status(403).json({
            error: 'Access denied'
        })
    }
    next()
}

const isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({ 
            error: 'You are not an admin'
        })
    }
    next()
}

const signOut =(req, res) =>{
    res.clearCookie('token');
    res.status(200).json({ message: 'user signout successful' })
}

module.exports ={
    signUp,
    signIn,
    signOut,
    isSignin,
    isAuthenticated,
    isAdmin
}