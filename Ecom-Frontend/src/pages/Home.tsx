import {Link} from "react-router-dom"
import ProductCard from "../components/ProductCard"
import { useLatestProductQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

const Home = () => {
  const { data , isLoading , isError }=useLatestProductQuery("");
  const addToCartHandler = () => {};


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