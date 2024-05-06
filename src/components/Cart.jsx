import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import Navbar from "./Navbar";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = (props) => {
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalCost = cartList.reduce((a, b) => a + b.price * b.quantity, 0);
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
      imageUrl: each.image_url,
      price: each.price,
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
    toast(data.message);
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

  const onShopNow = () => {
    const { history } = props;
    history.replace("/products");
  };

  const emptyView = () => {
    return (
      <div className="h-full w-full flex items-center justify-center flex-col flex-1 mt-[60px]">
        <img
          className="w-[50%] max-w-[300px]"
          src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/cart-line-icon.png"
          alt="empty cart"
        />
        <p className="font-bold text-[30px] mt-[20px]">Your Cart is Empty</p>
        <button
          onClick={onShopNow}
          className="bg-blue-600 p-[10px] text-white rounded mt-[15px]"
        >
          Shop Now
        </button>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="w-[90%] mx-auto mt-[26px]">
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
          <div className="flex flex-col h-full">
            {cartList.length === 0 ? (
              emptyView()
            ) : (
              <div className="flex flex-col">
                <ul className="mt-[20px] flex-1">
                  {cartList.map((each) => (
                    <CartItem
                      key={`cartItem ${each.id}`}
                      itemDetails={each}
                      deleteProduct={deleteProduct}
                      updateItemQuantity={updateItemQuantity}
                    />
                  ))}
                </ul>
                <p className="text-[30px] font-semibold mb-[10px] text-right">
                  Order Total: Rs {totalCost}/-
                </p>
                <button className="bg-blue-600 p-[15px] w-full rounded text-white md:self-end md:w-[200px]">
                  Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
