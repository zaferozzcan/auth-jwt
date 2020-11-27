require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;

const app = express();
// middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
