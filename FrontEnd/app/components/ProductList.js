"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/slices/apiSlice";

export const ProductList = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [pages, setPages] = useState([]);
  const { products } = useSelector((state) => state.products);

  const numberOfPages = Math.ceil(products.totalCount / 9);
  let pagesArray = [];

  const changePage = (e) => {
    dispatch(getProducts({ page: e.target.id }));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (products) {
      setProductList(products.products);
    }
  }, [products]);

  useEffect(() => {
    for (let i = 0; i < numberOfPages; i++) {
      pagesArray.push(i + 1);
    }
    setPages(pagesArray);
  }, [products]);

  useEffect(() => {
    console.log(pages);
  }, [pages]);

  return (
    <div className="container">
      <div className="row">
        {productList && productList.length > 0 ? (
          productList.map((product) => (
            <div className="col-12 col-sm-6 col-md-4" key={product._id}>
              <div className="card">
                <div className="card-body">
                  <p>Category: {product.category}</p>
                  <p>Price: {product.price}</p>
                  {/* Used <img> instead of <Image> to avoid nextJS domain restrictions */}
                  <img
                    className="img-fluid"
                    height={50}
                    width={50}
                    alt="product image"
                    src={product.image}
                  />
                  <p>{product.name}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="input-group justify-content-center">
        {pages.map((number) => (
          <button
            onClick={changePage}
            id={number}
            key={number}
            className="btn btn-link"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
