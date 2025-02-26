import React from "react";
import Slidebar from "../Components/Homes/Slidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4 ">
      <div className="border border-gray-300 rounded-xl p-4 w-1/6 flex flex-col justify-between bg-purple-400 ">
        <Slidebar />
      </div>
      <div className="border border-gray-300 bg-orange-400 rounded-xl p-4 w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
