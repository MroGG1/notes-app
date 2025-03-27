import { createNoteItemElement } from "../components/notes.js";

export function renderNotes(
  notesData,
  showArchived,
  isLoggedIn,
  notesListElement,
  toggleArchiveStatus
) {
  if (!isLoggedIn) {
    notesListElement.innerHTML = ""; 
    return;
  }

  notesListElement.innerHTML = ""; 

  const filteredNotes = notesData.filter((note) =>
    showArchived ? note.archived : !note.archived
  );

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
