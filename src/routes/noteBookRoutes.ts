import { Router, Request, Response } from "express";
import {
  addNote,
  deleteNote,
  getNotes,
  getSpecificNote,
  updateNote
} from "../controllers/noteBookController";

const noterouter: Router = Router();

noterouter.get("/", getNotes);
noterouter.get("/:noteID", getSpecificNote);
noterouter.delete("/:noteID", deleteNote);
noterouter.post("/", addNote);
noterouter.put("/:noteID", updateNote);

export default noterouter;
