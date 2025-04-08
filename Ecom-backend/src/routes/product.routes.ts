import express from "express";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProduct,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

//create new Product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

//get latest products - /api/v1/product/latest
app.get("/latest", getLatestProduct);

//get all categories - /api/v1/product/categories
app.get("/categories", getAllCategories);

//get all products - /api/v1/product/admin-products
app.get("/admin-products", adminOnly,getAdminProducts);

//get all products with filter - /api/v1/product/all
app.get("/all",getAllProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly,singleUpload, updateProduct)
  .delete(adminOnly,deleteProduct);

export default app;
