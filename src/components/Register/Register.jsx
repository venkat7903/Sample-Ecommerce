import React from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1 className="text-4xl font-bold mb-[10px]">Register Now</h1>
      <h1 className="text-3xl font-bold mb-[10px]">As</h1>
      <div className="flex mt-[10px]">
        <button
          onClick={() => props.history.push("/admin/register")}
          className="bg-blue-600 text-white w-[100px] h-[40px] rounded mr-[10px] cursor-pointer hover:scale-105"
        >
          Admin
        </button>
        <button
          onClick={() => props.history.push("/user/register")}
          className="bg-blue-600 text-white w-[100px] h-[40px] rounded ml-[10px] cursor-pointer hover:scale-105"
        >
          User
        </button>
      </div>
      <p className="mt-[25px] text-[20px]">
        Already have an account? Click{" "}
        <a className="underline text-blue-600" href="/login">
          here
        </a>{" "}
        to login
      </p>
    </div>
  );
};

export default Register;
