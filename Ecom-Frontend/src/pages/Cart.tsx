import { useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/Cart-item";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";



const Cart = () => {
  const { cartItems, subtotal, tax, shippingCharges, discount, total } =
    useSelector(
      (state: { cartRdeucer: cartReducerInitialState }) => state.cartRdeucer
    );

    console.log('====================================');
    console.log(cartItems);
    console.log('====================================');

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.productId}
              productId={item.productId}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
            />
          ))
        ) : (
          <h1>Cart is empty</h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Tax : ₹{tax}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>
          Discount: <em>- ₹{discount}</em>
        </p>
        <p>
          <b>Total : ₹{total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />
        {/* <button>Checkout</button> */}

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
