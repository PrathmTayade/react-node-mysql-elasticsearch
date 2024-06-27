import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import ApiRoutes from "./routes/routes.js";
import asyncHandler from "express-async-handler";
import errorHandler from "./middleware/errorHandler.js";
import { createIndex } from "./controllers/esClientController.js";

// Database connection if required

// Express
const app = express();

app.use(morgan("dev"));
app.use(cors());
// app.use(express.static("public"));

app.use(express.json());

// health check
app.get("/health", async (req, res) => {
  res.send({ message: "health OK!", status: 200 });
});

// api routes
app.use("/api", ApiRoutes);

// error handler
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  console.log("Your server available at http://localhost:3000");
});
