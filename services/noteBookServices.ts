import { notes } from "../data";
import { Note } from "../types/interface";

export function getNotes() {
  return notes;
}

export function getNoteById(id: number) {
  let note = notes.find((note) => note.id === id);
  if (note) return note;
  return null;
}

export function deleteTaskNote(id: number) {
  let indexofNote = notes.findIndex((note) => note.id === id);

  if (indexofNote < 0) {
    return null;
  } else {
    notes.splice(indexofNote, 1);
    return indexofNote;
  }
}
export function deleteNote(id: number) {
  let indexofNote = notes.findIndex((note) => note.id === id);

  if (indexofNote < 0) {
    return null;
  } else {
    notes.splice(indexofNote, 1);
    return indexofNote;
  }
}

export function updateNote(id: number, body: Note) {
  let indexOfNote = notes.findIndex((note) => note.id === id);

  if (indexOfNote >= 0) {
    notes[indexOfNote] = body;
    let success = true;
    return success;
  } else {
    return false;
  }
}

export function getSpecificNote(id: number): Note | null {
  const note = notes.find((note) => note.id === id);
  if (note) {
    return note;
  } else {
    return null;
  }
}

export function addNote(newNote: Note): void {
  notes.push(newNote);
}
