import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant, MdTask } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const Slidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  

  const data = [
    { title: "All Tasks", icons: <CgNotes />, link: "/" },
    {
      title: "Important Tasks",
      icons: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed Tasks",
      icons: <GrCompliance />,
      link: "/CompletedTask",
    },
    { title: "Incomplete Tasks", icons: <MdTask />, link: "/IncompleteTask" },
  ];

  const [userData, setUserData] = useState(null);
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure space after Bearer
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/task/getAllTasks",
        { headers }
      );
      setUserData(response.data.data);
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div>
        {userData && (
          <div>
            <h1 className="my-1 text-black">{userData.username}</h1>
            <h4 className="my-2 text-gray-400">{userData.email}</h4>
            <hr />
          </div>
        )}
      </div>

      <div>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i} // Ensure each link has a unique key
            className="m-1 flex hover:bg-black p-2 rounded translate-x-1"
          >
            {item.icons}

            {item.title}
          </Link>
        ))}
      </div>

      <div>
        <button
          onClick={logout}
          className="bg-gray-400 w-full p-2 rounded hover:bg-purple-400"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Slidebar;
