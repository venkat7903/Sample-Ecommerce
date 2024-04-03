import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const UserRegister = (props) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [subMsg, setSubMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, name, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const url = "https://sample-api-jv77.onrender.com/register";
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      setSubMsg(data.message);
      setIsRegistered(true);
    } else {
      setSubMsg(data.message);
      setIsRegistered(false);
      setShowErrorMsg(true);
    }
  };

  const clickLogin = () => {
    const { history } = props;
    history.replace("/login");
  };

  const renderSuccess = () => (
    <div className="text-white flex flex-col items-center">
      <div className="flex items-center">
        <img
          className="w-[35px] inline"
          alt="success"
          src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/success-green-check-mark-icon.png"
        />
        <h1 className="inline ml-[10px] text-[30px] font-semibold">
          Registration Successful
        </h1>
      </div>
      <button
        onClick={clickLogin}
        className="mt-[30px] bg-blue-600 text-white h-[40px] rounded cursor-pointer w-[100px]"
      >
        Login
      </button>
    </div>
  );

  const renderForm = () => (
    <form
      onSubmit={submitForm}
      className="bg-white max-w-[500px] shadow-lg w-[90%] px-[20px] py-[30px] rounded-md"
    >
      <h1 className="text-center text-4xl font-bold">Register as User</h1>
      <div className="flex flex-col mt-[20px]">
        <label htmlFor="username" className="text-gray-500">
          USERNAME<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          name="username"
          className="rounded mt-[5px] border border-black h-[35px] p-[10px]"
          placeholder="Enter your username"
        />
      </div>
      <div className="flex flex-col mt-[20px]">
        <label htmlFor="name" className="text-gray-500">
          NAME<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded mt-[5px] border border-black h-[35px] px-[10px]"
          placeholder="Enter your name"
        />
      </div>
      <div className="flex flex-col mt-[20px] mb-[10px]">
        <label htmlFor="password" className="text-gray-500">
          PASSWORD <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          name="password"
          className="rounded mt-[5px] border border-black h-[35px] px-[10px]"
          placeholder="Enter Username"
        />
      </div>
      <button className="w-full mt-[10px] bg-blue-600 text-white h-[40px] rounded cursor-pointer">
        Register
      </button>
      {showErrorMsg && (
        <p className="text-red-600 text-[16px] mt-[5px]">*{subMsg}</p>
      )}
    </form>
  );

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center">
      {isRegistered ? renderSuccess() : renderForm()}
    </div>
  );
};

export default withRouter(UserRegister);
