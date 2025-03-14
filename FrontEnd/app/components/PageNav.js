"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../store/slices/apiSlice";

export const PageNav = () => {
  const [pages, setPages] = useState([]);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const numberOfPages = Math.ceil(products.totalCount / 9);
  let pagesArray = [];

  useEffect(() => {
    for (let i = 0; i < numberOfPages; i++) {
      pagesArray.push(i + 1);
    }
    setPages(pagesArray);
  }, [products]);

  useEffect(() => {
    console.log(pages);
  }, [pages]);
  // return page list, handle page navigation
  return (
    <div className="input-group">
      {pages.map((number) => {
        <button className="btn btn-link">{number}</button>;
      })}
    </div>
  );
};
