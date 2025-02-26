import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "axios";

const SignUp = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await AxiosApi.post(
          "http://localhost:5000/api/user/signup",
          Data
        );

        alert(response.data.message);
        setData({ username: "", email: "", password: "" });
        history("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="h-[98vh] flex items-center justify-center">
        <div className="p-4 w-2/6 rounded bg-gray-800">
          <div className="font-semibold">Sign Up</div>
          <form>
            <input
              type="text"
              placeholder="username"
              className="bg-700 px-3 py-2 my-3 rounded w-full text-black"
              name="username"
              onChange={change}
              value={Data.username}
            />
            <input
              type="email"
              placeholder="email"
              className="bg-700 px-3 py-2 my-3 rounded w-full text-black"
              name="email"
              onChange={change}
              value={Data.email}
            />
            <input
              type="password"
              placeholder="password"
              className="bg-700 px-3 py-2 my-3 rounded w-full text-black"
              name="password"
              onChange={change}
              value={Data.password}
            />
            <div className="w-full flex items-between justify-between">
              <button
                onClick={submit}
                type="submit"
                className="bg-blue-300 text-xl font-semibold px-3 py-2 rounded text-black"
              >
                Sign Up
              </button>
              <Link to="/login" className="text-gray-400 hover:text-gray-200">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
