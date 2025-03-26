// Fungsi untuk membuat elemen catatan
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
  container.classList.add("note-item");

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  const bodyElement = document.createElement("p");
  bodyElement.textContent = body;

  const dateElement = document.createElement("small");
  dateElement.textContent = `Dibuat pada: ${createdAt}`;

  const archivedStatus = document.createElement("p");
  archivedStatus.textContent = archived ? "Diarsipkan" : "Tidak diarsipkan";

  const actionButton = document.createElement("button");
  actionButton.textContent = archived ? "Kembalikan" : "Arsipkan";
  actionButton.addEventListener("click", () => {
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

  container.append(
    titleElement,
    bodyElement,
    dateElement,
    archivedStatus,
    actionButton
  );

  return container;
}

// Fungsi untuk mengubah status arsip catatan
export function toggleArchiveStatus(noteId, notesData, callback) {
  const note = notesData.find((note) => note.id === noteId);
  if (note) {
    note.archived = !note.archived;
    callback();
  }
}
