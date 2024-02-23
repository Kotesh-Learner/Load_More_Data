import React, { useEffect, useState } from "react";
import "./styles.css";

const index = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProdcuts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip= ${
          count === 0 ? 0 : count * 20
        } `
      );
      const loaded_data = await response.json();

      if (loaded_data && loaded_data.products && loaded_data.products.length) {
        setLoading(false);
        setProducts([...loaded_data.products]);
        console.log(loaded_data);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
    if (loading) {
      return <div> Please Wait Products are Loading...!</div>;
    }
  }

  useEffect(() => {
    fetchProdcuts();
  }, [count]);
  useEffect(() => {
    if (products.length === 100) setDisableButton(true);
  }, [products]);

  return (
    <section>
      <div className="container">
        <div className="product-container">
          {products && products.length
            ? products.map((product, index) => (
                <div className="product" key={index}>
                  <img src={product.thumbnail} alt={product.tilte} />
                  <p>{product.title}</p>
                </div>
              ))
            : null}
        </div>

        <div className="buton-container">
          <button
            disabled={disableButton}
            className="button"
            onClick={() => setCount(count + 1)}
          >
            Load More Data
          </button>
          {disableButton ? <p>You Have Reached End Of Data...!</p> : null}
        </div>
      </div>
    </section>
  );
};

export default index;
