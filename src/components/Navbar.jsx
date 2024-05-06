import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { withRouter } from "react-router-dom";
import Popup from "reactjs-popup";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import Cookies from "js-cookie";

const Navbar = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const url = "https://sample-api-jv77.onrender.com/user-profile";
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.is_admin !== undefined) {
        setIsAdmin(true);
      }
    };
    getUserDetails();
  }, []);

  const links = [
    {
      id: uuidv4(),
      title: "Home",
      href: "/",
      isVisible: true,
    },
    {
      id: uuidv4(),
      title: "Products",
      href: "/products",
      isVisible: true,
    },
    {
      id: uuidv4(),
      title: "Modify Products",
      href: "/modify-products",
      isVisible: isAdmin,
    },
    {
      id: uuidv4(),
      title: "Cart",
      href: "/cart",
      isVisible: true,
    },
    {
      id: uuidv4(),
      title: "Profile",
      href: "/profile",
      isVisible: true,
    },
  ];

  const clickLogout = () => {
    const { history } = props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <nav className="w-full py-[10px] flex items-center shadow-md">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <h1 className="text-[30px] font-bold text-cyan-600">
          shop<span className="text-blue-600">Now</span>
        </h1>
        <div className="flex items-center">
          <ul className="hidden md:flex justify-between items-center">
            {links.map(
              ({ id, title, href, isVisible }) =>
                isVisible && (
                  <li
                    key={id}
                    className="ml-[20px] flex items-center hover:scale-105 duration-300 hover:text-indigo-600"
                  >
                    <a href={href} className="text-[20px] text-center">
                      {title}
                    </a>
                  </li>
                )
            )}
          </ul>

          <Popup
            modal
            trigger={
              <button className="flex md:hidden justify-center m-0 items-center">
                <FaBars size={30} />
              </button>
            }
          >
            {(close) => {
              return (
                <div className="bg-black w-screen h-screen flex flex-col items-center">
                  <button
                    onClick={() => close()}
                    className="self-end mt-[20px] mr-[20px]"
                  >
                    <FaTimes size={30} color="#fff" />
                  </button>
                  <ul className="flex flex-col items-center justify-center flex-1">
                    {links.map(
                      ({ id, title, href, isVisible }) =>
                        isVisible && (
                          <li
                            key={id}
                            className="mt-[25px] text-white hover:scale-105 duration-300 hover:text-indigo-600"
                          >
                            <a href={href} className="text-[30px] text-center">
                              {title}
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              );
            }}
          </Popup>

          <Popup
            modal
            trigger={
              <div className="flex items-center">
                <button className="hidden md:inline bg-blue-600 text-white text-[20px] h-[40px] w-[100px] ml-[20px] rounded">
                  Logout
                </button>
                <button className="p-0 md:hidden ml-[15px]">
                  <MdOutlineLogout size={30} />
                </button>
              </div>
            }
          >
            {(close) => {
              return (
                <div className="flex justify-center items-center h-screen w-screen bg-opacity-60 bg-black">
                  <div className="bg-white px-[40px] py-[40px] rounded">
                    <p className="mb-[20px]">
                      Are you sure, you want to logout?
                    </p>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => close()}
                        className="mr-[20px] border border-gray-500 h-[40px] w-[80px] rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={clickLogout}
                        className="ml-[20px] bg-blue-600 text-white h-[40px] w-[80px] rounded"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              );
            }}
          </Popup>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
