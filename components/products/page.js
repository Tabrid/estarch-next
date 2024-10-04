"use client";

import { fetchProducts } from "@/lib/slices/productsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Products() {
  const { products, isLoading, isError, error } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let content;
  if (isLoading) {
    content = <h1>Loading....</h1>;
  } else if (isError) {
    content = <h1>{error}</h1>;
  } else if (products.length === 0) {
    content = <h1>No products found</h1>;
  } else {
    content = <ul>{products.map(product => <li key={product.id}>{product.title}</li>)}</ul>;
  }

  return <div>{content}</div>;
}
