const route = require("express").Router();
const { getAUser,userById } = require("../controllers/user");

route.param('id', userById)
route.get('/fetchUser/:id',getAUser);

module.exports = route