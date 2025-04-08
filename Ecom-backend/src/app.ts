import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { connectToDB } from "./utils/connectToDatabase.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { console } from "inspector";




const app = express();

config({
    path: "./.env",
});

const port= process.env.PORT ||4000;
const mongoURI= process.env.MONGO_URI || "";

connectToDB(mongoURI);

export const myCache= new NodeCache();
app.use(express.json({limit: "16kb"}));
// app.use(express.urlencoded({extended: true,limit: "16kb"}))


app.use(morgan("dev"));



//importing routes 
import userRoute from "./routes/user.routes.js"
import productRoute from "./routes/product.routes.js"
import orderRoute from "./routes/order.routes.js"


//Using Routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute)
app.use("/api/v1/order",orderRoute)




app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);


app.get("/", (req, res) => {
    res.send("Hello Amrit kumar!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});