import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.URI_DB;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.set("strictQuery", false);

const ConnectDB = mongoose
  .connect(uri, options)
  .then((data) =>
    console.log(`MongoDB Connected: ${data.connection.host}`.blue.underline)
  )
  .catch((err) => {
    console.error(`${err}`.red);
    process.exit(1);
  });

export default ConnectDB;
