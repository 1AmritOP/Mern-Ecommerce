import {Link} from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useLatestProductQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducure";

const Home = () => {
  const dispatch = useDispatch();
  const { data , isLoading , isError }=useLatestProductQuery("");

  const addToCartHandler = (cartItem: CartItem) => {
    if(cartItem.stock<1) return toast.error("Product is out of stock");
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");
  };


  if (isError) toast.error("Cannot fetch products");


  return (
    <>
      <div className=" home">
        <section></section>
        <h1>
          Latest Products
          <Link to={"/search"} className="findmore">More</Link>
        </h1>


        <main>
          {
            isLoading ? <Skeleton width="80vw" />
            :
          ( 
            data?.products.map((product) => (
              <ProductCard 
              key={product._id}
              productId={product._id}
              name={product.name}
              photo={product.photo}
              price={product.price}
              stock={product.stock}
              handler={addToCartHandler}
              />
            ))
          )}
          {/* <ProductCard productId="1" name="Product 1" photo="https://cdn.mos.cms.futurecdn.net/QMa729pgead8uFrroav5f5.jpg" price={100} stock={10} handler={addToCartHandler} /> */}
        </main>

      </div>
    </>
  )
}

export default Home