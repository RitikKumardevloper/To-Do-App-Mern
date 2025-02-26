import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "axios";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await AxiosApi.post(
          "http://localhost:5000/api/user/login",
          Data
        );
        setData({ username: "", password: "" });

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        history("/");
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className=" h-[98vh] flex  items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
          <div className="font-semibold">Login</div>
          <input
            type="username"
            placeholder="username"
            className="bg-700 px-3 py-2 my-3 rounded w-full text-black"
            name="username"
            value={Data.username}
            onChange={change}
          />
          <input
            type="password"
            placeholder="password"
            className="bg-700 px-3 py-2 my-3 rounded w-full text-black"
            name="password"
            value={Data.password}
            onChange={change}
          />
          <div className="w-full flex items-between justify-between">
            <button
              onClick={submit}
              className="bg-blue-300 text-xl font-semibold px-3 py-2 rounded text-black"
            >
              Login
            </button>
            <Link to="/signup" className="text-gray-400 hover:text-gray-200">
              Not Having an account ?signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
