import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { router } from "./routes/memoRoutes.js";
import ConnectDB from "./config/memoDB.js";
// import ErrorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/", router);

//override default error handler
// app.use(ErrorHandler); 

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
