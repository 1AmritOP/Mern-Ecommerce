// import React from 'react'
import {FaPlus} from "react-icons/fa"
import { server } from "../redux/store"
import { CartItem } from "../types/types"
type ProductsProps={
    productId:string,
    name:string,
    photo:string,
    price:number,
    stock:number,
    handler:(cartItem:CartItem)=> string | undefined,
}
const ProductCard = ({
    productId,
    name,
    photo,
    price,
    stock,
    handler
}:ProductsProps) => {
  return (
    <div className="product-card">
      <img 
      src={`${server}/${photo}` } 
      alt={name}  />
      <p>{name}</p>
      <span>₹ {price.toLocaleString("en-IN")}</span>
      <div>
        <button onClick={()=> handler({productId,name,price,quantity:1,photo,stock})}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default ProductCard