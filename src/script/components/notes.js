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
  titleElement.classList.add("note-title"); 
  titleElement.addEventListener("click", () => {
    const noteDetails = document.createElement("note-details");
    noteDetails.noteData = { id, title, body, createdAt, archived };
    document.body.appendChild(noteDetails);
  });

  const bodyElement = document.createElement("p");
  bodyElement.textContent = body;

  const dateElement = document.createElement("small");
  dateElement.textContent = `Dibuat pada: ${createdAt}`;

  const archivedStatus = document.createElement("p");
  archivedStatus.textContent = archived ? "Diarsipkan" : "Tidak diarsipkan";

  const archiveButton = document.createElement("button");
  archiveButton.textContent = archived ? "Kembalikan" : "Arsipkan";
  archiveButton.classList.add("archive-button");
  archiveButton.addEventListener("click", () => {
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

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", () => {
    editNote(id, notesData, renderNotes, notesListElement, toggleArchiveStatus);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteNote(
      id,
      notesData,
      renderNotes,
      notesListElement,
      toggleArchiveStatus
    );
  });

  container.append(
    titleElement,
    bodyElement,
    dateElement,
    archivedStatus,
    archiveButton,
    editButton,
    deleteButton
  );

  return container;
}

export function toggleArchiveStatus(noteId, notesData, callback) {
  const note = notesData.find((note) => note.id === noteId);
  if (note) {
    note.archived = !note.archived;
    callback();
  }
}

export function deleteNote(
  noteId,
  notesData,
  renderNotes,
  notesListElement,
  toggleArchiveStatus
) {
  const confirmDelete = window.confirm(
    "Apakah Anda yakin ingin menghapus catatan ini?"
  );
  if (confirmDelete) {
    const noteIndex = notesData.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notesData.splice(noteIndex, 1);
      renderNotes(
        notesData,
        false,
        true,
        notesListElement,
        toggleArchiveStatus
      );
    }
  }
}

export function editNote(
  noteId,
  notesData,
  renderNotes,
  notesListElement,
  toggleArchiveStatus
) {
  const note = notesData.find((note) => note.id === noteId);
  if (note) {
    const newTitle = prompt("Edit Judul Catatan:", note.title);
    const newBody = prompt("Edit Isi Catatan:", note.body);

    if (newTitle !== null && newBody !== null) {
      note.title = newTitle.trim();
      note.body = newBody.trim();
      renderNotes(
        notesData,
        false,
        true,
        notesListElement,
        toggleArchiveStatus
      );
    }
  }
}
