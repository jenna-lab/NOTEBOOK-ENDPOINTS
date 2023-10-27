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

export function updateNote(id: number, newNote: Note) {
  let indexofNote = notes.findIndex((note) => note.id === id);
  if (indexofNote < 0) {
    return null;
  } else {
    notes[indexofNote] = newNote;
    return indexofNote;
  }
}

export function addNote(newNote: Note) {
  let lastNote = notes[notes.length - 1];
  newNote.id = lastNote.id + 1;
  notes.push(newNote);
}

export function getSpecificNote(id: number) {
  let note = notes.find((note) => note.id === id);
  if (note) return note;
  return null;
}

