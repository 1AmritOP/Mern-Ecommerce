import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";


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