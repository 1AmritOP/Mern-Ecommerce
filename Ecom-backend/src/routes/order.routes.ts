import express from "express";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.controller.js";
import { adminOnly } from "../middlewares/auth.js";

const app=express.Router();

//create new Order - /api/v1/order/new
app.post("/new",newOrder);

//get my orders - /api/v1/order/my
app.get("/my",myOrders);

//get all orders - /api/v1/order/all
app.get("/all",adminOnly,allOrders);


app.route("/:id").get(getSingleOrder).put(adminOnly,processOrder).delete(adminOnly,deleteOrder);

export default app;
