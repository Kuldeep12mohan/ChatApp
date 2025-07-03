const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mainRouter = require("./routes/index");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);
const PORT = process.env.PORT
app.listen(PORT,()=>
{
  console.log("app is listening on port 3000");
});