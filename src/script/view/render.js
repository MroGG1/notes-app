import { createNoteItemElement } from "../components/notes.js";

export function renderNotes(
  notesData,
  showArchived,
  isLoggedIn,
  notesListElement,
  toggleArchiveStatus
) {
  if (!isLoggedIn) {
    notesListElement.innerHTML = ""; // Kosongkan elemen daftar catatan tanpa menampilkan pesan
    return;
  }

  notesListElement.innerHTML = ""; // Kosongkan elemen daftar catatan
  notesData
    .filter((note) => (showArchived ? note.archived : !note.archived)) // Filter berdasarkan status archived
    .forEach((note) => {
      const element = createNoteItemElement(
        note,
        toggleArchiveStatus,
        notesData,
        renderNotes,
        showArchived,
        isLoggedIn,
        notesListElement
      );
      notesListElement.append(element);
    });
}
