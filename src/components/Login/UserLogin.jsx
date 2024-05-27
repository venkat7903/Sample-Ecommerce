import React, { useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const UserLogin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Redirect to="/" />;
  }

  const onLoginSuccess = (data) => {
    const { jwtToken } = data;
    const { history } = props;
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    history.replace("/");
  };

  const submitForm = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const userDetails = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const url = "https://sample-api.up.railway.app/login";
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok === true) {
      onLoginSuccess(data);
    } else {
      setSubMsg(data.message);
      setShowErrorMsg(true);
    }
    setIsLoading(false);
  };

  const renderForm = () => (
    <form
      onSubmit={submitForm}
      className="bg-white max-w-[500px] shadow-lg w-[90%] px-[20px] py-[30px] rounded-md"
    >
      <h1 className="text-center text-4xl font-bold">Login as User</h1>
      <div className="flex flex-col mt-[20px]">
        <label htmlFor="username" className="text-gray-500">
          USERNAME<span className="text-red-600">*</span>
        </label>
        <input
          required
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          name="username"
          className="rounded mt-[5px] border border-black h-[35px] p-[10px]"
          placeholder="Enter your username"
        />
      </div>
      <div className="flex flex-col mt-[20px] mb-[10px]">
        <label htmlFor="password" className="text-gray-500">
          PASSWORD <span className="text-red-600">*</span>
        </label>
        <input
          required
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
        {isLoading ? (
          <div className="w-full flex items-center justify-center font-bold">
            <Oval color="#fff" width={30} height={25} />
          </div>
        ) : (
          "Login"
        )}
      </button>
      {showErrorMsg && (
        <p className="text-red-600 text-[16px] mt-[5px]">*{subMsg}</p>
      )}
    </form>
  );

  return (
    <div className="bg-black w-full h-screen flex flex-col justify-center items-center">
      {renderForm()}
    </div>
  );
};

export default UserLogin;
