import express from "express";
import {
  getMemo,
  postMemo,
  updateMemo,
  deleteMemo,
} from "../controllers/memoControllers.js";

export const router = express.Router();

router
  .route("/")
  .get(getMemo)
  .post(postMemo)
  .put(updateMemo)
  .delete(deleteMemo);
