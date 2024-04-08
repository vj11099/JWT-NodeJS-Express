// const cors = require("cors");
import "dotenv/config";
import express, { json } from "express";
import { connect } from "mongoose";
import routes from "./routes/auth-routes.js";

const app = express();

app.use(json());

//CORS configuration
// app.use(
//   cors({
//     origin: "*",
//   })
// );

const URI = process.env.MONGO_URI;

//database connection
connect(URI)
  .then((res) => {
    console.log("Listening to Port 3001");
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(routes);
