import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import CompleteTask from "./Pages/CompleteTask";
import IncomplteTask from "./Pages/IncompleteTask";
import AllTasks from "./Pages/AllTasks";
import ImportantTasks from "./Pages/ImportantTasks";
import SingUp from "./Pages/SingUp";
import Login from "./Pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
function App() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);
  return (
    <>
      <div className="bg-gray-700 text-white h-screen p-2">
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<AllTasks />} />

            <Route path="/CompletedTask" element={<CompleteTask />} />
            <Route path="/IncompleteTask" element={<IncomplteTask />} />
            <Route path="/ImportantTasks" element={<ImportantTasks />} />
          </Route>
          <Route path="/signup" element={<SingUp />} />
          <Route path="/login" element={<Login />} />
         
        </Routes>
      </div>
    </>
  );
}

export default App;
