import React from "react";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <img
        className="w-[70%] max-w-[350px]"
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
      />
      <p className="text-[30px] font-bold">Not Found</p>
    </div>
  );
};

export default NotFound;
