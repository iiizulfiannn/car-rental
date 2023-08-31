require("dotenv").config();

import express from "express";
import Server from "./src/index";

const app = express();
const server = new Server(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app
  .listen(PORT, "127.0.0.1", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(JSON.stringify(err));
    }
  });
