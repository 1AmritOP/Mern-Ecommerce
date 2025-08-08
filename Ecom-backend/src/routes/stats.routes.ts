import express from "express";
import { getDashboardStats, getPieCharts, getBarCharts, getLineCharts } from "../controllers/stats.controller.js";
import { adminOnly } from "../middlewares/auth.js";

const app=express.Router();

app.get("/stats",adminOnly,getDashboardStats);

app.get("/piecharts",adminOnly,getPieCharts);

app.get("/barcharts",adminOnly,getBarCharts);

app.get("/linecharts",adminOnly,getLineCharts);


export default app