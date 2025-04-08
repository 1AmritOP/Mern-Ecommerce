import mongoose, { Schema } from "mongoose";

const orderSchema= new mongoose.Schema({
    shippingInfo: {
        address:{
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },
    user:{
        type: String,
        ref: "User",
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    shippingCharges: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: ["Processing", "Shipped", "Delivered"],
        default: "Processing"
    },
    orderItems: [
        {
            name:String,
            price: Number,
            quantity: Number,
            photo: String,
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            }
        }
    ]
},{timestamps:true});

export const Order=mongoose.model("Order",orderSchema);