import Cookies from "js-cookie";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductItem = (props) => {
  const { productDetails } = props;
  const { id, productName, imageUrl, price } = productDetails;
  const [quantity, setQuantity] = useState(1);

  const addProductToCart = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://sample-api-jv77.onrender.com/cart";
    const productData = {
      productId: id,
      productName,
      quantity,
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
  };

  return (
    <li key={id} className="mr-[10px] w-[90%] mx-auto mb-[20px]">
      <img src={imageUrl} alt={productName} className="w-full h-[200px]" />
      <div className="flex justify-between">
        <p className="text-[20px] capitalize">{productName}</p>
        <p>{price}/-</p>
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
          className="w-full text-center bg-blue-500 text-white rounded cursor-pointer h-[40px]"
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
};

export default ProductItem;
