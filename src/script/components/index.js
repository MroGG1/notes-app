import { notesData } from "../data/data.js";
import { createNavbar } from "../view/main.js";
import { renderNotes } from "../view/render.js";
import { toggleArchiveStatus } from "./notes.js";
import "./login.js";
import "./responsive.js";

const notesListElement = document.querySelector("#notesList");

let showArchived = false;
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

// Handler untuk tombol filter
function handleFilterClick() {
  showArchived = !showArchived;
  filterButton.textContent = showArchived
    ? "Tampilkan Catatan Tidak Diarsipkan"
    : "Tampilkan Catatan Diarsipkan";
  renderNotes(notesData, showArchived, isLoggedIn, notesListElement, (id) =>
    toggleArchiveStatus(id, notesData, () =>
      renderNotes(
        notesData,
        showArchived,
        isLoggedIn,
        notesListElement,
        toggleArchiveStatus
      )
    )
  );
}

// Handler untuk tombol logout
function handleLogoutClick() {
  isLoggedIn = false;
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  logoutButton.style.display = "none";
  filterButton.style.display = "none";

  // Periksa apakah form login sudah ada
  let loginForm = document.querySelector("login-form");
  if (!loginForm) {
    loginForm = document.createElement("login-form");
    document.body.prepend(loginForm);
  }
}

// Buat navbar dan dapatkan referensi tombol
const { filterButton, logoutButton } = createNavbar(
  handleLogoutClick,
  handleFilterClick
);

// Render awal
if (isLoggedIn) {
  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
} else {
  // Periksa apakah form login sudah ada
  let loginForm = document.querySelector("login-form");
  if (!loginForm) {
    loginForm = document.createElement("login-form");
    document.body.prepend(loginForm);
  }
}

document.addEventListener("login-success", (event) => {
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  const loginForm = document.querySelector("login-form");
  if (loginForm) loginForm.remove();
  logoutButton.style.display = "block";
  filterButton.style.display = "block";
  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
});
