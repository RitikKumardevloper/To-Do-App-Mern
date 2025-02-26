import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({
  InputDiv,
  setInputDiv,
  updatedDate,
  setupdatedData,
  addTask,
  updateTaskInState,
}) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: updatedDate.title || "", desc: updatedDate.desc || "" });
  }, [updatedDate]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (!Data.title || !Data.desc) {
      alert("Title and description cannot be empty.");
      return;
    }

    const taskData = {
      title: Data.title,
      desc: Data.desc,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/createTask",
        taskData,
        { headers }
      );
      alert("Task added successfully!");
      addTask({ id: response.data.taskId, ...taskData });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response?.data || error.message
      );
      alert(error.response?.data.message || "Failed to add task.");
    }
  };

  const UpdateTask = async () => {
    if (!Data.title || !Data.desc) {
      alert("Title and description cannot be empty.");
      return;
    }

    const taskData = {
      title: Data.title,
      desc: Data.desc,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/UpdateTaskbyId/${updatedDate.id}`,
        taskData,
        { headers }
      );
      alert("Task updated successfully!");
      updateTaskInState({ id: updatedDate.id, ...taskData });
      setData({ title: "", desc: "" });
      setupdatedData({ id: "", title: "", desc: "" });
      setInputDiv("hidden");
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response?.data || error.message
      );
      alert(error.response?.data.message || "Failed to update task.");
    }
  };

  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 w-full h-screen opacity-60 bg-gray-600`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 w-full h-screen flex justify-center items-center`}
      >
        <div className="w-3/6 bg-slate-700 p-4 rounded">
          <div className="flex justify-end">
            <button
              className="text-2xl"
              onClick={() => {
                setInputDiv("hidden");
                setData({ title: "", desc: "" });
                setupdatedData({ id: "", title: "", desc: "" });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            name="title"
            placeholder="title"
            className="px-3 py-2 rounded w-full text-black"
            value={Data.title}
            onChange={change}
          />
          <textarea
            cols="30"
            rows="10"
            name="desc"
            placeholder="enter the description ......."
            className="px-3 py-2 rounded w-full bg-gray-600 my-3 text-black"
            value={Data.desc}
            onChange={change}
          ></textarea>
          <div>
            {updatedDate.id === "" ? (
              <button
                onClick={submitData}
                className="px-3 py-3 bg-green-300 rounded text-black text-xl font-semibold"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={UpdateTask}
                className="px-3 py-3 bg-green-300 rounded text-black text-xl font-semibold"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputData;
