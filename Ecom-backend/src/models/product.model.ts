import mongoose from "mongoose";
import { trim } from "validator";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Please Enter Product name"],
        },
        photo:{
            type: String,
            required: [true,"Please provide Product image"]
        },
        stock:{
            type: Number,
            required: [true,"Please provide Product stock"],
        },
        price:{
            type: Number,
            required: [true,"Please provide Product price"],
        },
        category:{
            type: String,
            required: [true,"Please provide Product category"],
            trim: true
        }
    }
    ,{ timestamps: true }
);

export const Product= mongoose.model("Product",productSchema)