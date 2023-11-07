import { Response, Request } from "express";
import mssql from "mssql";
import { sqlConfig } from "../config/sqlConfig";

export function TestingRoute(req: Request, res: Response) {
  return res.send("Server Runningt");
}

export async function getNotes(req: Request, res: Response) {
  try {
    const checkNoteQuery = "SELECT * FROM Notebook";

    mssql
      .connect(sqlConfig)
      .then((pool) => {
        return pool.request().query(checkNoteQuery);
      })
      .then(async (result) => {
        if (result.recordset.length > 0) {
          console.log("success", result);

          return res.status(200).json(result.recordset);
        }
      });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
}

export async function getSpecificNote(req: Request, res: Response) {
  const note_id = req.params.noteID;
  
  try {
    const query = `SELECT * FROM Notebook WHERE id = '${note_id}'`;

    const pool = await mssql.connect(sqlConfig);
    const result = await pool.request().query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    const specificNote = result.recordset[0];

    return res.status(200).json(specificNote);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the note" });
  }
}

export async function addNote(req: Request, res: Response) {
  let { id, title, content } = req.body;
  console.log(req.body);
  
  let query = `INSERT INTO Notebook (id, title, content) VALUES ('${id}', '${title}', '${content}')`;

  mssql
    .connect(sqlConfig)
    .then((pool) => {
      return pool.request().query(query);
    })
    .then((result) => {
      // console.log("success", result);
      res.send("Note added successfully");
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        error: err.message || "An error occurred creating the note.",
      });
    });
}

export async function updateNote(req: Request, res: Response) {
  try {
    let { id, title, content } = req.body;
    let query = `
      UPDATE Notebook 
      SET title = '${title}', content = '${content}'
      WHERE id = '${id}'
      `;

    mssql
      .connect(sqlConfig)
      .then((pool) => {
        return pool.request().query(query);
      })
      .then((result) => {
        console.log("Note updated successfully", result);
        res.status(200).json({ message: "Note updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err.message || "An error occurred updating the note.",
        });
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred processing the request." });
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  const note_id = req.params.noteID;

  try {
    const checkNoteQuery = `SELECT * FROM Notebook WHERE id = '${note_id}'`;

    const pool = await mssql.connect(sqlConfig);
    const checkResult = await pool.request().query(checkNoteQuery);

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    const deleteQuery = `DELETE FROM Notebook WHERE id = '${note_id}'`;

    const deleteResult = await pool.request().query(deleteQuery);

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred deleting the note" });
  }
};
