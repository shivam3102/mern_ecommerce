const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
       
    },
    role:{
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    }
}, {timestamps:true})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

userSchema.statics.authenticate = async function(email, password){
    console.log('email'+ email);
    console.log('password'+ password);
    const user = await User.findOne({email})
    console.log(user)
    if(user){

        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }else{
            return false
        }
    }else{
        return false
    }

}
const User = mongoose.model('user',userSchema);
module.exports = {User}
