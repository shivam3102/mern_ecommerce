const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const cartRoute = require('./routes/cartRoute')
const categoryRoute = require('./routes/categoryRoute')
const subCategoryRoute =require('./routes/subCategoryRoute'); 
const productRoute =require('./routes/productRoute'); 
const path = require('path'); 
const fs = require('fs'); 
const app = express();

const PORT = process.env.PORT || 5000;
require('dotenv').config()

//middlewares
// app.use(express.static(__dirname,'uploads'))
app.use(express.urlencoded({limit: '50mb',extended: true,parameterLimit:50000}))
app.use(express.json({limit: '50mb'}))
app.use(helmet())
app.use(cookieParser())
//database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));

  //routes
  app.get('/uploads/:file', function (req, res){
    file = req.params.file;
  
    let reqPath = path.join(__dirname, './');
    var img = fs.readFileSync(reqPath + "uploads/" + "/" +file);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  });

  app.use('/api', authRoute);
  app.use('/api', userRoute);
  app.use('/api', categoryRoute);
  app.use('/api', subCategoryRoute);
  app.use('/api', productRoute);
  app.use('/api', cartRoute);
  
