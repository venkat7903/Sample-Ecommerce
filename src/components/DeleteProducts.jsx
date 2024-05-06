import React, { useState } from "react";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Oval } from "react-loader-spinner";

const DeleteProducts = () => {
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://sample-api-jv77.onrender.com/products/${productId}`;
    const options = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
    };
    const resposne = await fetch(url, options);
    const data = await resposne.json();
    console.log(data);
    setIsLoading(false);
    toast(data.message);
    setProductId("");
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-[90%] h-full mx-auto flex flex-col justify-center">
        <h1 className="text-[35px] font-bold text-center my-[20px]">
          Delete Products Section
        </h1>
        <form
          onSubmit={onDeleteProduct}
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
            className="border border-gray-600 mb-[20px] rounded-sm h-[40px] px-[10px]"
            placeholder="Enter Product Id"
            type="text"
          />

          <button className="bg-red-600 h-[40px] text-white rounded-sm flex items-center justify-center">
            {isLoading ? (
              <div>
                <Oval color="#fff" width={30} height={30} />
              </div>
            ) : (
              "Delete Product"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteProducts;
