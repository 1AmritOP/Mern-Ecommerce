// import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type cartItemProps = {
  productId: string,
  name: string,
  price: number,
  quantity: number,
  // stock: number,
  image: string
}

const CartItem = ( {productId, name, price, quantity, image} :cartItemProps) => {
  return (
    <div className=' cart-item'>
      <img  src={image} alt={name} />

      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>


      <div>
        <button>-</button>
        <span>{quantity}</span>
        <button>+</button>
      </div>

      <button>
        <FaTrash />
      </button>

    </div>
  )
}

export default CartItem