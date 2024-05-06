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
      <div className="min-h-screen w-full self-center flex flex-col items-center justify-center">
        <div className="w-[90%] flex flex-col items-center justify-center md:flex-row">
          <div className="flex flex-col items-center justify-center md:w-[50%]">
            <p className="text-[30px] font-bold mb-[30px]">
              Clothes That Get YOU Noticed
            </p>
            <img
              src="https://i.pinimg.com/originals/de/dd/3d/dedd3d8f3ec58659e569f95cbdcb027f.jpg"
              alt="hoodie"
              className="w-[50%] mb-[30px] md:hidden"
            />
            <p className="text-gray-500">
              Fashion is part of the daily air and it does not quite help that
              it changes all the time. Clothes have always been a marker of the
              era and we are in a revolution. Your fashion makes you been seen
              and heard that way you are. So, celebrate the seasons new and
              exciting fashion in your own way.
            </p>
            <button
              onClick={clickShopNow}
              className="bg-blue-600 text-white h-[40px] w-[100px] rounded cursor-pointer mt-[20px]"
            >
              Shop Now
            </button>
          </div>
          <div className="w-[50%] flex items-center justify-center">
            <img
              src="https://i.pinimg.com/originals/de/dd/3d/dedd3d8f3ec58659e569f95cbdcb027f.jpg"
              alt="hoodie"
              className="w-[70%] mb-[30px] hidden md:inline h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
