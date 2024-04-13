import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Navbar from "./Navbar";
import { ThreeDots } from "react-loader-spinner";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, []);

  const getCartProducts = async () => {
    setIsLoading(true);
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://sample-api-jv77.onrender.com/cart";
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const formattedData = data.map((each) => ({
      id: each.id,
      userId: each.user_id,
      productId: each.product_id,
      productName: each.product_name,
      quantity: each.quantity,
    }));
    setCartList(formattedData);
    setIsLoading(false);
  };

  const deleteProduct = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://sample-api-jv77.onrender.com/cart/${id}/`;
    const options = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    getCartProducts();
  };

  const updateItemQuantity = async (quantity, id) => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://sample-api-jv77.onrender.com/cart/${id}/`;
    const updateItems = { quantity };
    const options = {
      method: "PUT",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(updateItems),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    getCartProducts();
  };

  return (
    <div>
      <Navbar />
      <div className="w-[90%] mx-auto">
        <h1 className="text-4xl font-bold flex items-center">
          Your Cart{" "}
          <span className="ml-[10px] p-[15px] text-[20px] text-red-600 border border-black rounded-full h-[25px] w-[25px] font-normal flex items-center justify-center">
            {cartList.length}
          </span>
        </h1>
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <ThreeDots color="#000" />
          </div>
        ) : (
          <ul className="mt-[20px]">
            {cartList.map((each) => (
              <CartItem
                key={`cartItem ${each.id}`}
                itemDetails={each}
                deleteProduct={deleteProduct}
                updateItemQuantity={updateItemQuantity}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
