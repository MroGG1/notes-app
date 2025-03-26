import { createNoteItemElement } from "../components/notes.js";

// Fungsi untuk merender daftar catatan
export function renderNotes(
  notesData,
  showArchived,
  isLoggedIn,
  notesListElement,
  toggleArchiveStatus
) {
  if (!isLoggedIn) {
    notesListElement.innerHTML = ""; // Kosongkan elemen daftar catatan jika belum login
    return;
  }

  notesListElement.innerHTML = ""; // Kosongkan elemen daftar catatan sebelum merender ulang

  // Filter catatan berdasarkan status arsip
  const filteredNotes = notesData.filter((note) =>
    showArchived ? note.archived : !note.archived
  );

  // Buat elemen untuk setiap catatan yang lolos filter
  filteredNotes.forEach((note) => {
    const noteElement = createNoteItemElement(
      note,
      toggleArchiveStatus,
      notesData,
      renderNotes,
      showArchived,
      isLoggedIn,
      notesListElement
    );
    notesListElement.appendChild(noteElement);
  });
}
