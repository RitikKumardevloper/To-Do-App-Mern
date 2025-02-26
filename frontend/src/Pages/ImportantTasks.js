import React, { useEffect, useState } from "react";
import Cards from "../Components/Homes/Cards";
import axios from "axios";

const ImportantTasks = () => {
  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure space after Bearer
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/task/getimpTasks",
          { headers }
        );

        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [ headers]); // Empty dependency array to run only once
  console.log(data);
  return (
    <div>
      <Cards home={"false"} data={data} />
    </div>
  );
};

export default ImportantTasks;
