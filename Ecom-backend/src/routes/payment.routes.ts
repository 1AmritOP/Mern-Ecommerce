import express from "express";
import { applyCoupon, createPaymentIntent, deleteCoupon, getAllCoupon, newCoupon } from "../controllers/payment.controller.js";
import { adminOnly } from "../middlewares/auth.js";

const app=express.Router();

app.post("/create",createPaymentIntent)

//create new coupon - /api/v1/coupon/new
app.post("/coupon/new",adminOnly,newCoupon)

//apply discount - /api/v1/discount
app.get("/discount",applyCoupon)

//get all coupons - /api/v1/coupon/all
app.get("/coupon/all",adminOnly,getAllCoupon)

//delete coupon - /api/v1/coupon/:id
app.delete("/coupon/:id",adminOnly,deleteCoupon);

export default  app