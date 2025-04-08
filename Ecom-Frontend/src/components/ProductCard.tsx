// import React from 'react'

type ProductsProps={
    productId:string,
    name:string,
    photo:string,
    price:number,
    stock:number,
    handler:()=> void,
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
    <div>ProductCard</div>
  )
}

export default ProductCard