import Cookies from "js-cookie";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductItem = (props) => {
  const { productDetails } = props;
  const { id, productName, imageUrl, price } = productDetails;
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Used React Loader to make loader visible 

  // ADD products to Cart
  const addProductToCart = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://sample-api.up.railway.app/cart";
    const productData = {
      productId: id,
      productName,
      quantity,
      imageUrl,
      price,
    };
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    };

    const resposne = await fetch(url, options);
    const data = await resposne.json();
    console.log(data);
    toast(data.message);
    setIsLoading(false);
  };

  return (
    <li key={id} className="mr-[10px] w-[90%] mx-auto mb-[20px]">
      <div
        data-tooltip-id={`tooltip ${id}`}
        data-tooltip-content={`productId ${id}`}
        data-tooltip-place="top"
      >
        <Tooltip id={`tooltip ${id}`} />
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-[200px] md:h-[250px]"
        />
      </div>

      <div className="flex justify-between">
        <p className="text-[20px] md:text-[25px] capitalize font-semibold">
          {productName}
        </p>
        <p className="text-[20px] md:text-[25px] font-semibold">{price}/-</p>
      </div>
      <div className="flex items-stretch">
        <div className="flex items-center mr-[10px]">
          <button
            onClick={() => {
              if (quantity === 1) {
                setQuantity(1);
              } else {
                setQuantity(quantity - 1);
              }
            }}
            className="cursor-pointer mr-[10px]"
          >
            <FaMinus />
          </button>
          <p className="mr-[10px] text-[25px] border border-black w-[35px] flex items-center justify-center">
            {quantity}
          </p>
          <button onClick={() => setQuantity(quantity + 1)}>
            <FaPlus />
          </button>
        </div>
        <button
          onClick={addProductToCart}
          className="flex items-center justify-center w-full text-center bg-blue-500 text-white rounded cursor-pointer h-[40px]"
        >
          {isLoading ? (
            <div>
              <Oval color="#fff" width={30} height={30} />
            </div>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
