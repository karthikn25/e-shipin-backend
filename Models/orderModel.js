// const mongoose = require("mongoose");


// const orderSchema = new mongoose.Schema({
//     user:{
//         type:mongoose.ObjectId,
//         ref:"User",
//         required:true
//     },
//     items:[{
//         product:{
//             type:mongoose.ObjectId,
//             ref:"Product",
//             required:true
//         },
//         quantity:{
//             type:Number,
//             default:1,
            
//         }
//     }],
//     totalAmount:{
//         type:Number,
//         required:true,
        
//     },
//     currency:{
//         type:String,
//         default:'INR'
//     },
//     paymentId:{
//         type:String,
//         required:true

//     },
//     orderStatus:{
//         type:String,
//         default:"Processign",
//         enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
//     }
// },{timestamps:true});

// const Order = mongoose.model("Order",orderSchema);

// module.exports = {Order};

const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },  // Razorpay order ID
  amount: { type: Number, required: true },    // Total amount of the order
  amount_due: { type: Number, required: true }, // Amount still due
  amount_paid: { type: Number, required: true }, // Amount already paid
  attempts: { type: Number, required: true },    // Number of payment attempts
  created_at: { type: Date, required: true },    // Timestamp of when the order was created
  currency: { type: String, required: true },    // Currency (INR)
  receipt: { type: String, required: true },     // Unique receipt for the order
  status: { type: String, required: true },      // Status of the order (e.g., created, paid)
  notes: { type: Array },                        // Any additional notes
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
