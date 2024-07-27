const express=require("express")
const {viewimages}= require("../controller/images");
const imagesRouter=express.Router();

imagesRouter.route('/api').get(viewimages)

module.exports= {imagesRouter};