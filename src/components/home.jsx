import React from "react";
import Navbar from "./Navbar";

const home = (props) => {
  const clickShopNow = () => {
    const { history } = props;
    history.push("/products");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-screen flex flex-col justify-center items-center">
        <p className="text-[50px] font-semibold">Home</p>
        <button
          onClick={clickShopNow}
          className="bg-blue-600 text-white h-[40px] w-[100px] rounded cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default home;
