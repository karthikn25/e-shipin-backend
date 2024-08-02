const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    user:{
        ref:"User",
        required:true,
        type:mongoose.ObjectId
    },
    items:[
        {
            product:{
                ref:"Product",
                required:true,
                type:mongoose.ObjectId
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        }
    ]
},
{timestamps:true})

const Cart = mongoose.model("Cart",cartSchema);

module.exports = {Cart}