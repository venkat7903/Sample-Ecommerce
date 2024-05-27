import React, { useState } from "react";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Oval } from "react-loader-spinner";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onAddProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const productInfo = {
      productName,
      imageUrl,
      price: productPrice,
    };
    const url = "https://sample-api.up.railway.app/products/";
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(productInfo),
    };
    const resposne = await fetch(url, options);
    const data = await resposne.json();
    setIsLoading(false);
    setProductName("");
    setImageUrl("");
    setProductPrice("");
    toast(data.message);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-[90%] h-full mx-auto flex flex-col justify-center">
        <h1 className="text-[35px] font-bold text-center my-[20px]">
          Add Products Section
        </h1>
        <form
          onSubmit={onAddProduct}
          className="flex flex-col w-[100%] max-w-[400px] mx-auto"
        >
          <label
            htmlFor="productname"
            className="text-gray-500 font-semibold mb-[7px]"
          >
            PRODUCT NAME
          </label>
          <input
            id="productname"
            required
            onChange={(event) => setProductName(event.target.value)}
            value={productName}
            className="border border-gray-600 mb-[20px] rounded-sm h-[40px] px-[10px]"
            placeholder="Enter Product Name"
            type="text"
          />
          <label
            htmlFor="productimage"
            className="text-gray-500 font-semibold mb-[7px]"
          >
            PRODUCT IMAGE
          </label>
          <input
            id="productimage"
            required
            onChange={(event) => setImageUrl(event.target.value)}
            value={imageUrl}
            className="border border-gray-600 mb-[20px] rounded-sm h-[40px] px-[10px]"
            placeholder="Enter Product Image Url"
            type="text"
          />
          <label
            htmlFor="productprice"
            className="text-gray-500 font-semibold mb-[7px]"
          >
            PRODUCT PRICE
          </label>
          <input
            id="productprice"
            required
            onChange={(event) => setProductPrice(event.target.value)}
            value={productPrice}
            className="border border-gray-600 mb-[20px] rounded-sm h-[40px] px-[10px]"
            placeholder="Enter Product Price"
            type="number"
          />
          <button className="bg-blue-600 h-[40px] text-white rounded-sm flex items-center justify-center">
            {isLoading ? (
              <div>
                <Oval color="#fff" width={30} height={30} />
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProducts;
