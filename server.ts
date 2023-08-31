require("dotenv").config();

import express from "express";
import Server from "./src/index";
import path from "path";

const app = express();
const server = new Server(app);
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
export const IP_ADDRESS = process.env.IP_ADDRESS || "127.0.0.1";

app.use(express.static(path.join(__dirname + "/src", "resource")));

app
  .listen(PORT, IP_ADDRESS, function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(JSON.stringify(err));
    }
  });
