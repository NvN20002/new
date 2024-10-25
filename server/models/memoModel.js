import { Schema, model } from "mongoose";

const memoSchema = Schema({
  title: String,
  content: String,
});

const Memo = model("memo", memoSchema);

export default Memo;
