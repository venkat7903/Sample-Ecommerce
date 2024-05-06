/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import ProductItem from "./ProductItem";

const orderByCriteria = [
  {
    id: uuidv4(),
    criteria: "Default",
    value: "id",
  },
  {
    id: uuidv4(),
    criteria: "Price",
    value: "price",
  },
];

const sortType = [
  {
    id: uuidv4(),
    sortBy: "(Low to High)",
    value: "ASC",
  },
  {
    id: uuidv4(),
    sortBy: "(High to Low)",
    value: "DESC",
  },
];

const Products = () => {
  const [products, setProducts] = useState([{}]);
  const [searchText, setSearchText] = useState("");
  const [orderBy, setOrderBy] = useState(orderByCriteria[0].value);
  const [orderType, setOrderType] = useState(sortType[0].value);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://sample-api-jv77.onrender.com/products?search_q=${searchText}&orderBy=${orderBy}&order=${orderType}`;
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const resposne = await fetch(url, options);
    const data = await resposne.json();
    const formattedData = data.map((each) => ({
      id: each.id,
      productName: each.product_name,
      imageUrl: each.image_url,
      price: each.price,
    }));
    setProducts(formattedData);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [searchText, orderBy, orderType]);

  const renderLoader = () => (
    <div className="flex justify-center items-center h-full">
      <ThreeDots color="#000" size={30} />
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="w-[90%] mx-auto h-screen py-[20px]">
        <div>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search Products"
            className="w-full md:w-[300px] border border-black h-[40px] px-[10px] outline-none"
          />
          <div className="mt-[20px] flex">
            <select
              value={orderBy}
              className="block border border-black mr-[20px] rounded"
              onChange={(event) => setOrderBy(event.target.value)}
            >
              {orderByCriteria.map(({ id, criteria, value }) => (
                <option key={id} value={value}>
                  {criteria}
                </option>
              ))}
            </select>
            <select
              value={orderType}
              className="block border border-black ml-[20px] rounded"
              onChange={(event) => setOrderType(event.target.value)}
            >
              {sortType.map(({ id, sortBy, value }) => (
                <option key={id} value={value}>
                  {sortBy}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isLoading ? (
          renderLoader()
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[30px]">
            {products.map((each) => {
              return <ProductItem key={each.id} productDetails={each} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
