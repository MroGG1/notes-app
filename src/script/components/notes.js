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

  // Tombol Arsip/Kembalikan
  const archiveButton = document.createElement("button");
  archiveButton.textContent = archived ? "Kembalikan" : "Arsipkan";
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

  // Tombol Edit
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    editNote(id, notesData, renderNotes, notesListElement, toggleArchiveStatus);
  });

  // Tombol Hapus
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
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

// Fungsi untuk mengubah status arsip catatan
export function toggleArchiveStatus(noteId, notesData, callback) {
  const note = notesData.find((note) => note.id === noteId);
  if (note) {
    note.archived = !note.archived;
    callback();
  }
}

// Fungsi untuk menghapus catatan
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
      notesData.splice(noteIndex, 1); // Hapus catatan dari array
      renderNotes(
        notesData,
        false,
        true,
        notesListElement,
        toggleArchiveStatus
      ); // Render ulang catatan
    }
  }
}

// Fungsi untuk mengedit catatan
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
      ); // Render ulang catatan
    }
  }
}
