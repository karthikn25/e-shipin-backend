const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const {Category} = require('../Models/categoryModel')
dotenv.config();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads", "category"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const router = express.Router();

// Create a new category
router.post('/create', upload.single("photo"),async (req, res) => {
  const { name } = req.body;

  try {
      // Check if category already exists
      let category = await Category.findOne({ name });
      if (category) {
          return res.status(400).json({ msg: 'Category already exists' });
      }
     let photo;
     const Base_URL = process.env.Backend_url;
     if(process.env.NODE_ENV==='production'){
      Base_URL=`${req.protocol}://${req.get("host")}`
     } 
     if(req.file){
      photo=`${Base_URL}/uploads/category/${req.file.originalname}`
     }
      // Create new category
      category = new Category({
          name,
          photo
      });

      await category.save();

      res.status(201).json({ msg: 'Category created successfully', category });
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/getall',async(req,res)=>{
  try {
    const category = await Category.find({});
    if(!category){
      res.status(400).json({message:"data not found"})
    }
    res.status(200).json({message:"data found successfully",length:category.length,category})
  } catch (error) {
    console.error(error);
      res.status(500).send('Internal Server Error');
  }
})
router.get("/getsingle/:id",async(req,res)=>{
  try {
    const category = await Category.findById({_id:req.params.id});
    if(!category){
      res.status(400).json({message:"data not found"})
    }
    res.status(200).json({message:"data found successfully",category})
  } catch (error) {
    console.error(error);
      res.status(500).send('Internal Server Error');
  }
})
const categoryRouter = router;

module.exports = {categoryRouter}