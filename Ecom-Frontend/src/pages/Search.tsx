import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);


  const isPrevPage= true;
  const isNextPage= true;

  const addToCartHandler = () => {};
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            <option value="men">Men</option>
            <option value="women">Car</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="search-product-list">
          <ProductCard
            productId="1"
            name="Product 1"
            photo="https://cdn.mos.cms.futurecdn.net/QMa729pgead8uFrroav5f5.jpg"
            price={100}
            stock={10}
            handler={addToCartHandler}
          />
        </div>

        <article>
          <button 
          disabled={!isPrevPage}
          onClick={() => {
            setPage((prev) => prev -1);
          }}
          >
            Prev
          </button>

          <span>{page} of {10}</span>

          <button 
          disabled={!isNextPage}
          onClick={() => {
            setPage((prev) => prev +1);
          }}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
