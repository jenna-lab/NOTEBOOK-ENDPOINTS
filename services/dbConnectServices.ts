export async function addNote(note: Note) {
  let { id, title, content, createdAt } = note;
  let connectionPool = await dbConnectService();
  let query = `INSERT INTO notes (note_id, title, content,createdAt) VALUES ('${id}', '${title}', '${content}','${createdAt}')`;

  connectionPool?.connect(async (err) => {
    if (err) {
      console.log(err);
    } else {
      let results = await connectionPool?.request().query(query);
      console.log(results);
    }
  });
}
