import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";

export const createPaymentIntent=TryCatch(async(req,res,next)=>{
    const {amount}=req.body;

    if(!amount){
        return next(new ErrorHandler("Please enter amount",400));
    }

    const paymentIntent=await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency:"inr",
    })

    
    res.status(201).json({
        success:true,
        clientSecret:paymentIntent.client_secret
    })
})

export const newCoupon=TryCatch(async(req,res,next)=>{
    const {coupon,amount}=req.body;

    if(!coupon || !amount){
        return next(new ErrorHandler("Please enter all details",400));
    }

    await Coupon.create({
        coupon,
        amount
    })

    return res.status(200).json({
        success:true,
        message:"Coupon Created Successfully",
        coupon
    })
})

export const applyCoupon=TryCatch(async(req,res,next)=>{
    const {coupon}=req.query;

    const discount=await Coupon.findOne({coupon})

    if (!discount) {
        return next(new ErrorHandler("Invalid Coupon Code",404))
    }

    return res.status(200).json({
        success:true,
        discount: discount.amount
    })
})

export const getAllCoupon=TryCatch(async(req,res,next)=>{
    const coupons=await Coupon.find()

    if (!coupons) {
        return next(new ErrorHandler("Coupons not Found",404))
    }

    return res.status(200).json({
        success: true,
        coupons
    })
})

export const deleteCoupon=TryCatch(async(req,res,next)=>{
    const {id}=req.params;

    const coupon=await Coupon.findByIdAndDelete(id)

    if (!coupon) {
        return next(new ErrorHandler("Invalid Id",404))
    }

    return res.status(200).json({
        success: true,
        message:"Coupon Deleted Successfully"
    })
})