import { myCache } from "../app.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { invalidateCacheProps } from "../types/types.js";

export const invalidateCache= async({product, order, admin}: invalidateCacheProps)=>{
    if (product) {
        const productKeys: string[]=["latest-products","categories","all-products"];

        const products=await Product.find().select("_id");

        products.forEach(i => {
            productKeys.push(`product-${i._id}`);
        });

        myCache.del(productKeys);
    }
}

