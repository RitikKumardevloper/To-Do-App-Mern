const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./Db/Connect");

const app = express();
app.use(cors());
app.use(express.json());

const UserApi = require("./Router/User");
const TaskApi = require("./Router/Task");

app.use("/api/user", UserApi);
app.use("/api/task", TaskApi);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
