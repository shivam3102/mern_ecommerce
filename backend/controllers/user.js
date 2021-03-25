const {User} = require("../models/User");

const userById = async (req, res, next, id)=>{
    try {
        
        const user = await User.findById(id);
        if(user){
            req.profile= user,
            next()
        }else{
            res.status(400).json({
                error:"User not Found"
            })
        }

    }  catch (err) {
            res.status(400).json({ error: 'problem in getuserid'}, err.message)
        }
}
const getAUser =(req, res) =>{
  try {
    req.profile.password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    res.status(200).json(req.profile)
  } catch (err) {
    res.status(400).json({ error: 'problem in getuser'}, err.message)
    }
}

// const updateUser = (req, res)=>{
//     try {
        
//     } catch (err) {
//         res.status(400).json({ error: 'problem in update user'}, err.message)
//     }
// }

module.exports = {
    userById,
    getAUser
}