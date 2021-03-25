const route = require("express").Router();
const {check} = require("express-validator");
const {signUp, signIn, signOut } = require("../controllers/auth")

route.post('/signup',[
     check('name', "Name should have atleast 5 character").isLength({min: 5}),
    check('email', "Enter valid email").isEmail(),
    check('password', "Password should have atleast 6 character").isLength({min: 6}),
], signUp)

route.post('/signin',[
  
    check('email', "Enter valid email").isEmail(),
    check('password', "Password should have atleast 6 character").isLength({min: 6}),
], signIn)

route.get('/signout', signOut)

module.exports = route;