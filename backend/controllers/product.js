const {Product} = require("../models/Product")
const formidable = require('formidable'); 
const path = require('path'); 
const bluebird = require('bluebird')
const fs = bluebird.promisifyAll(require('fs')) 
const _ =require("lodash")

//route PARAMS 
//desc to get a particular product by id
const getProduct = async (req, res,next, id) =>{
    try {
        const product = await Product.findById(id)
        if(product){
            req.product = product
            next()
        }else{
            res.status(400).json({
                error: "product not found"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "problem in productById"
        },err)
    }
}

const getProductById = async (req, res)=>{
    try {
        const productById = req.product;
        if(productById){
            res.status(200).json(productById)
        }else{
            res.status(400).json({
                error:"failed to get a product"
            })
        }
    }  catch (err) {
        res.status(400).json({
            error: "problem in productById"
        },err)
    }
}


// Returns true or false depending on whether the file is an accepted type
// function checkAcceptedExtensions (file) {
// 	const type = file.type.split('/').pop()
// 	const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf']
// 	if (accepted.indexOf(type) == -1) {
// 		return false
// 	}
// 	return true
// }

const createProduct =async  (req, res)=>{
    try {
        const form = formidable.IncomingForm();
        form.keepExtensions = true
     
        const uploadsFolder = path.join('uploads')
        console.log(uploadsFolder)
      //  const uploadsFolder = './uploads';
        form.multiples = true
        form.maxFileSize = 50* 1024*1024; //50MB
        form.uploadDir = uploadsFolder;
    
        form.parse(req, async (err, fields, files) => {
            let myUploadedFiles = []
            if (err) {
                console.log('Error parsing the incoming form')
                return res.json({ok: false, msg: 'Error passing the incoming form'})
            }
            
           // If we are sending only one file:
            if (!files.image.length) {
                const file = files.image
                
                var fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-').replace(/ /g,"_"))
                fileName = new Date().getTime()+fileName;
                myUploadedFiles.push(fileName)

                const ass=	await fs.renameAsync(file.path, path.join(uploadsFolder, fileName))
                
            } else {
                for(let i = 0; i < files.image.length; i++) {
                    const file = files.image[i]
                
                    var fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-').replace(/ /g,"_"))
                    fileName = new Date().getTime()+fileName;
                    myUploadedFiles.push(fileName)

                    const ass=	await fs.renameAsync(file.path, path.join(uploadsFolder, fileName))
                
                }
            }
                const implodeImage = myUploadedFiles.join("//")
            
                const productCreate = new Product(fields);  
                productCreate.image = myUploadedFiles
                const addProduct = await productCreate.save();
                if(addProduct){
                    res.status(200).json({ok: true, msg: 'Files uploaded succesfully!', files: myUploadedFiles, imp:implodeImage, fields: fields })
                }else{
                    res.status(400).json({
                        error: "failed to add Product"
                    })
                }

        })
   
    } catch (err) {
        res.status(400).json({
            error: "problem in add product"
        },err)
    }
}

const updateProduct =  (req, res)=>{
    try {
        const form = formidable.IncomingForm();
        form.keepExtensions = true
      
        const uploadsFolder = './uploads';
        form.multiples = true
        form.maxFileSize = 50* 1024*1024; //50MB
        form.uploadDir = uploadsFolder;
        form.parse(req, async (err, fields, files) => {
            let myUploadedFiles = []
            if (err) {
                console.log('Error parsing the incoming form')
                return res.json({ok: false, msg: 'Error passing the incoming form'})
            }
           
            let product = req.product
            product = _.extend(product,fields);
            //check image exist or not
          if(files.image){
              //If we are sending only one file:
            if (!files.image.length) {
                const file = files.image
                
                const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-').replace(/ /g,"_"))
                myUploadedFiles.push(fileName)
                
                product.image= myUploadedFiles
                
            } else {
                for(let i = 0; i < files.image.length; i++) {
                    const file = files.image[i]
                
                    const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-').replace(/ /g,"_"))
                    myUploadedFiles.push(fileName)
                
                }
                product.image= myUploadedFiles
            }
          }

            const addProduct = await product.save();
                if(addProduct){
                    res.status(200).json(addProduct)
                }else{
                    res.status(400).json({
                        error: "failed to update Product"
                    })
                }

        })
    } catch (err) {
        res.status(400).json({
            error: "problem in update product"
        },err)
    }
}



const deleteProduct = async (req, res) =>{
    try {
        const productDelete =await Product.findByIdAndDelete(req.product._id)
        if(productDelete){
            res.status(200).json({
                error: `Successfully deleted ${productDelete.name}`    
            })
        }else{
            res.status(400).json({
                error:"failed to delete a product"
            })
        }
    } catch (err) {
        res.status(400).json({
            error: "problem in deleteProduct"
        },err)
    }
}


const getProducts= async (req, res)=>{
    try {
        const products = await Product.find()
        if(products){
            res.status(200).json(products)
        }else{
            res.status(400).json({
                error:"failed to get a products"
            })
        }
        
    } catch (err) {
        res.status(400).json({
            error: "problem in fetching Products"
        },err)
    }
}

const searchProducts = async (req, res) =>{
    try {
        const searchFields = req.query.name;
       
        const products = await Product.find({name: {$regex:searchFields,$options: "i"}})
        if(products){
            res.status(200).json(products)
        }else{
            res.status(400).json({
                error:"failed to get a search  products"
            })
        }
        
    } catch (err) {
        res.status(400).json({
            error: "problem in fetching search Products"
        },err)
    }
}

module.exports ={
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getProductById,
    searchProducts
}