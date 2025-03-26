export function createNoteItemElement(
  { id, title, body, createdAt, archived },
  toggleArchiveStatus,
  notesData,
  renderNotes,
  showArchived,
  isLoggedIn,
  notesListElement
) {
  const container = document.createElement("div");
  container.setAttribute("data-noteid", id);

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  const archivedNotes = document.createElement("p");
  archivedNotes.innerText = archived ? "Diarsipkan" : "Tidak diarsipkan";

  container.append(titleElement, archivedNotes);

  if (!archived) {
    const bodyElement = document.createElement("p");
    bodyElement.innerText = body;

    const createNotes = document.createElement("p");
    createNotes.innerText = createdAt;

    const toggleArchiveButton = document.createElement("button");
    toggleArchiveButton.textContent = "Arsipkan";
    toggleArchiveButton.addEventListener("click", () => {
      toggleArchiveStatus(id, notesData, () =>
        renderNotes(
          notesData,
          showArchived,
          isLoggedIn,
          notesListElement,
          toggleArchiveStatus
        )
      );
    });

    container.append(bodyElement, createNotes, toggleArchiveButton);
  } else {
    const unarchiveButton = document.createElement("button");
    unarchiveButton.textContent = "Kembalikan";
    unarchiveButton.addEventListener("click", () => {
      toggleArchiveStatus(id, notesData, () =>
        renderNotes(
          notesData,
          showArchived,
          isLoggedIn,
          notesListElement,
          toggleArchiveStatus
        )
      );
    });

    container.append(unarchiveButton);
  }

  return container;
}

export function toggleArchiveStatus(noteId, notesData, callback) {
  const note = notesData.find((note) => note.id === noteId);
  if (note) {
    note.archived = !note.archived; // Ubah status arsip
    callback(); // Panggil callback untuk merender ulang
  }
}
