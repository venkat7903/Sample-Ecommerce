import React, { useState } from "react";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Oval } from "react-loader-spinner";

const UpdateProducts = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});

  const onUpdateProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const productInfo = {
      productName,
      imageUrl,
      price: productPrice,
    };
    const url = `https://sample-api.up.railway.app/products/${productId}`;
    const options = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(productInfo),
    };
    const resposne = await fetch(url, options);
    const data = await resposne.json();
    console.log(data);
    setIsLoading(false);
    setProductName("");
    setImageUrl("");
    setProductPrice("");
    setProductId("");
    toast(data.message);
  };

  const onGetProductDetails = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://sample-api-jv77.onrender.com/products/${productId}`;
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status === 400) {
      toast(data.message);
    }
    const formattedData = {
      id: data.id,
      imageUrl: data.image_url,
      price: data.price,
      productName: data.product_name,
    };
    console.log(data);
    setIsLoading(false);
    setProductDetails(formattedData);
    setProductName(formattedData.productName);
    setImageUrl(formattedData.imageUrl);
    setProductPrice(formattedData.price);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-[90%] h-full mx-auto flex flex-col justify-center">
        <h1 className="text-[35px] font-bold text-center my-[20px]">
          Update Products Section
        </h1>
        <form
          onSubmit={onUpdateProduct}
          className="flex flex-col w-[100%] max-w-[400px] mx-auto"
        >
          <label
            htmlFor="productid"
            className="text-gray-500 font-semibold mb-[7px]"
          >
            PRODUCT ID
          </label>
          <input
            id="productid"
            required
            onChange={(event) => setProductId(event.target.value)}
            value={productId}
            onBlur={onGetProductDetails}
            className="border border-gray-600 mb-[20px] rounded-sm h-[40px] px-[10px]"
            placeholder="Enter Product Id"
            type="text"
          />
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
          <button className="bg-green-600 h-[40px] text-white rounded-sm flex items-center justify-center">
            {isLoading ? (
              <div>
                <Oval color="#fff" width={30} height={30} />
              </div>
            ) : (
              "Update Product"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProducts;
