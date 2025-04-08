import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newOrderReqBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { Order } from "../models/order.model.js";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";



export const myOrders=TryCatch(async(req,res,next)=>{
  const { id:user }=req.query;
  const key=`my-oders-${user}`;

  let orders=[];

  if (myCache.has(key)) {
    orders=JSON.parse(myCache.get(key) as string);
  } else {
    orders=await Order.find( { user } );
    myCache.set(key,JSON.stringify(orders))
  }

  return res.status(200).json({
    success:true,
    orders,
  })
})

export const allOrders=TryCatch(async(req,res,next)=>{
  let orders=[];
  const key=`all-orders`
  if (myCache.has(key)) {
    orders=JSON.parse(myCache.get(key) as string)
  } else {
    orders= await Order.find().populate("user","name");
    myCache.set(key,JSON.stringify(orders))
  }

  return res.status(200).json({
    success:true,
    orders
  })
})

export const getSingleOrder=TryCatch(async(req,res,next)=>{
  const {id}=req.params;
  const key=`order-${id}`;

  let order;

  if (myCache.has(key)) {
    order=JSON.parse(myCache.get(key) as string)
  } else {
    order=await Order.findById(id).populate("user","name");
    if (!order) return next(new ErrorHandler("Order not found",404));

    myCache.set(key,JSON.stringify(order))
  }

  return res.status(200).json({
    success:true,
    order
  })
})

export const newOrder = TryCatch(
  async (req: Request<{},{},newOrderReqBody>, res: Response, next: NextFunction) => {
    const {shippingInfo,user,subtotal,tax,discount,shippingCharges,total,orderItems}=req.body;

    if (!shippingInfo || !user || !subtotal || !tax  || !total || !orderItems) {
        return next(new ErrorHandler("Please enter all details", 400));
    }

    const order=await Order.create({
        shippingInfo,
        user,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
        orderItems
    })

    await invalidateCache({order:true, admin:true, product:true});

    return res.status(201).json({
        success:true,
        order
    })
  }
);

export const processOrder=TryCatch(async(req,res,next)=>{
  const {id} = req.params;
  const order=await Order.findById(id)

  if(!order) return next(new ErrorHandler("Product not Fount",404));

  switch(order.status){
    case "Processing":
      order.status="Shipped";
      break;
    case "Shipped":
      order.status="Delivered";
      break;
    default:
      order.status="Delivered";
      break;
  }

  await order.save();

  await invalidateCache({order:false, admin:true, product:true});

  return res.status(200).json({
    success:true,
    message:"Order Processed Successfully"
  })
})

export const deleteOrder=TryCatch(async(req,res,next)=>{
  const {id}=req.params;
  const order=await Order.findByIdAndDelete(id);

  if(!order){
    return next(new ErrorHandler("Order not found",404));
  }

  await invalidateCache({order:false, admin:true, product:true});

  return res.status(200).json({
    success:true,
    message:"Order deleted successfully"
  })
})