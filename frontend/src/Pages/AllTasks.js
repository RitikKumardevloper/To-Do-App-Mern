import React, { useState, useEffect } from "react";
import Cards from "../Components/Homes/Cards";
import { IoAddCircleOutline } from "react-icons/io5";
import InputData from "../Components/Homes/InputData";
import axios from "axios";

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [userData, setUserData] = useState();
  const [updatedDate, setupdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });
  // Define data state
  const [data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure space after Bearer
  };

  const addTask = (newTask) => {
    setData((prevData) => [...prevData, newTask]);
  };

  const updateTaskInState = (updatedTask) => {
    setData((prevData) =>
      prevData.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/task/getAllTasks",
          { headers }
        );

        setUserData(response.data.data);
        setData(response.data.data.tasks);
        // Set data state with tasks
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once

  return (
    <>
      <div className="justify-end p-4">
        <div className="w-full flex justify-end p-4">
          <button
            onClick={() => {
              setInputDiv("fixed");
            }}
          >
            <IoAddCircleOutline className="text-5xl text-gray-400 hover:text-gray-200 transition-all duration-300" />
          </button>
        </div>
        {userData && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={data} // Pass the data state
            setData={setData} // Pass the setData function
            setupdatedData={setupdatedData}
          />
        )}
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        updatedDate={updatedDate}
        addTask={addTask} // Pass the function
        setupdatedData={setupdatedData}
        updateTaskInState={updateTaskInState}
      />
    </>
  );
};

export default AllTasks;
