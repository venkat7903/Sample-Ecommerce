import React from "react";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";
const ModifyProducts = (props) => {
  const itemList = [
    {
      id: uuidv4(),
      text: "Add Products",
      className: "bg-blue-600",
      path: "/add-products",
    },
    {
      id: uuidv4(),
      text: "Update Products",
      className: "bg-green-600",
      path: "/update-products",
    },
    {
      id: uuidv4(),
      text: "Delete Products",
      className: "bg-red-600",
      path: "/delete-products",
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="h-screen w-[90%] mx-auto  flex flex-col justify-center items-center">
        {itemList.map((each) => (
          <button
            key={each.id}
            onClick={() => props.history.push(each.path)}
            className={`hover:scale-105 duration-300 bg-blue-600 ${each.className} mb-[30px] text-[30px] text-white p-[10px] w-[100%] md:w-[400px] sm:w-[400px] rounded`}
          >
            {each.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModifyProducts;
