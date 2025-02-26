import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState } from "react";

const Cards = ({ home, setInputDiv, data, setData, setupdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure space after Bearer
  };
  console.log("Data received:", data);
  const handlecompleteTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/UpdateCompleteTaskbyId/${id}`,
        {},
        { headers }
      );
      console.log(response.data.message);

      // Update local state to reflect the change
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, complete: !item.complete } : item
        )
      );
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to complete task.");
    }
  };

  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/updateImportantTaskbyId/${id}`,
        {},
        { headers }
      );
      console.log("Response from server:", response.data); // Log the response

      // Update local state to reflect the change
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, important: !item.important } : item
        )
      );
    } catch (error) {
      console.error("Error updating important status:", error);
      alert("Failed to update important status.");
    }
  };

  const deletetask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/task/deleteTaskbyId/${id}`,
        { headers }
      );

      // Update local state to remove the deleted task
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const handleUpdate = async (task) => {
    setInputDiv("fixed");
    setupdatedData({ id: task._id, title: task.title, desc: task.desc });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/UpdateTaskbyId/${task._id}`,
        {
          title: task.title,
          desc: task.desc,
        },
        {
          headers: {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update local state to reflect the changes
      setData((prevData) =>
        prevData.map((item) =>
          item._id === task._id
            ? { ...item, title: task.title, desc: task.desc }
            : item
        )
      );
    } catch (error) {
      console.log("Error updating task:", error);
      alert("Failed to update task.");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data && data.length > 0 ? (
        data.map((items) => (
          <div
            key={items._id}
            className="flex flex-col justify-between bg-orange-300 border rounded-sm border-gray-200 p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          >
            <div>
              <h1 className="text-xl font-bold">{items?.title}</h1>
              <p className="text-lg">{items?.desc}</p>
            </div>
            <div className="m-2 w-full flex items-center">
              <button
                className={`${
                  items.complete ? "bg-green-800" : "bg-red-500"
                } p-2 rounded`}
                onClick={() => handlecompleteTask(items._id)}
              >
                {items.complete ? "Completed" : "Incomplete"}
              </button>
              <div className="color-white w-3/5 text-2xl flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important ? (
                    <FaHeart className="text-red-700" />
                  ) : (
                    <CiHeart />
                  )}
                </button>
                <button onClick={() => handleUpdate(items)}>
                  <FaEdit />
                </button>
                <button onClick={() => deletetask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No tasks available.</div> // Handle empty state
      )}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-orange-300 border rounded-sm hover:scale-105 hover:cursor-pointer transition-all duration-300 border-gray-200 p-4"
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircleOutline className="text-5xl" />
          <h2 className="text-3xl text-gray-300">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
