import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const CartItem = (props) => {
  const { itemDetails, deleteProduct, updateItemQuantity } = props;
  const { id, productName, quantity, imageUrl, price } = itemDetails;

  return (
    <li className="flex justify-between items-center shadow-md p-[15px] mb-[15px] rounded-md">
      <div className="flex-1 flex items-center">
        <img className="w-[60px] h-[60px]" src={imageUrl} alt={productName} />
        <p className="ml-[10px]">{productName}</p>
      </div>
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
      <p className="text-[20px] flex-1">Rs.{quantity * price}/-</p>
      <button className="cursor-pointer" onClick={() => deleteProduct(id)}>
        <TiDelete size={25} />
      </button>
    </li>
  );
};

export default CartItem;
