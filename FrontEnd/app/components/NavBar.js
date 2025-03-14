"use client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts, setFilter } from "../store/slices/apiSlice";

export const NavBar = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.esm.js");
    }
  }, []);
  const dispatch = useDispatch();

  const search = (e) => {
    dispatch(getProducts({ query: e.target.value }));
  };

  const sortByCat = (e) => {
    dispatch(setFilter({ category: e.target.id }));
    dispatch(getProducts({ category: e.target.id }));
  };

  const sortByPrice = (e) => {
    dispatch(setFilter({ price: e.target.id }));
    dispatch(getProducts({ price: e.target.id }));
  };

  return (
    <div className="container text-center p-2">
      <nav className="input-group">
        <input
          className="form-control"
          onChange={search}
          placeholder="Search for a product"
          type="text"
        />
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Category
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              id="Home"
              onClick={sortByCat}
              className="dropdown-item"
              type="button"
            >
              Home
            </button>
            <button
              id="Sports"
              onClick={sortByCat}
              className="dropdown-item"
              type="button"
            >
              Sports
            </button>
            <button
              id="Health"
              onClick={sortByCat}
              className="dropdown-item"
              type="button"
            >
              Health
            </button>
            <button
              id="Music"
              onClick={sortByCat}
              className="dropdown-item"
              type="button"
            >
              Music
            </button>
            <button
              id="Baby"
              onClick={sortByCat}
              className="dropdown-item"
              type="button"
            >
              Baby
            </button>
            <button
              id="Electronics"
              onClick={sortByCat}
              className="dropdown-item"
              type="button"
            >
              Electronics
            </button>
          </div>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Price
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              id="highest"
              onClick={sortByPrice}
              className="dropdown-item"
              type="button"
            >
              High to low
            </button>
            <button
              id="lowest"
              onClick={sortByPrice}
              className="dropdown-item"
              type="button"
            >
              Low to high
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
