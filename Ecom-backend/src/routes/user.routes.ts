import express from "express";
import { deletUser, getAllUsers, getSingleUser, newUser } from "../controllers/user.controller.js";
import { adminOnly } from "../middlewares/auth.js";


const app=express.Router();

app.post("/new",newUser);

app.get("/all",adminOnly,getAllUsers);

app.route("/:id").get(getSingleUser).delete(adminOnly,deletUser);

export default app;