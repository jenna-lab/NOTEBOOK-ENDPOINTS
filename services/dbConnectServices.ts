import { dbConfig } from "../config/db";
import { Note } from "../types/interface";

export async function addNote(note: Note) {
  let { id, title, content, createdAt } = note;
  let connectionPool = await require("tedious").connect(dbConfig);
  let query = `INSERT INTO notes (note_id, title, content,createdAt) VALUES ('${id}', '${title}', '${content}','${createdAt}')`;

  connectionPool?.connect(async (err:Error) => {
    if (err) {
      console.log(err);
    } else {
      let results = await connectionPool?.request().query(query);
      console.log(results);
    }
  });
}
