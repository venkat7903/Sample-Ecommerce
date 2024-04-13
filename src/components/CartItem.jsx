import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const CartItem = (props) => {
  const { itemDetails, deleteProduct, updateItemQuantity } = props;
  const { id, productName, quantity } = itemDetails;

  return (
    <li className="flex justify-between items-center shadow-md p-[10px] mb-[15px]">
      <p className="flex-1">{productName}</p>
      <div className="flex-1 flex items-center">
        <button
          className="cursor-pointer"
          onClick={() => updateItemQuantity(quantity - 1, id)}
        >
          <FaMinus />
        </button>

        <p className="mr-[10px] ml-[10px] border border-black w-[30px] flex justify-center items-center">
          {quantity}
        </p>
        <button
          className="cursor-pointer"
          onClick={() => updateItemQuantity(quantity + 1, id)}
        >
          <FaPlus />
        </button>
      </div>
      <button className="cursor-pointer" onClick={() => deleteProduct(id)}>
        <TiDelete />
      </button>
    </li>
  );
};

export default CartItem;
