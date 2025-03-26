import { notesData } from "../data/data.js";
import { createNavbar } from "../view/main.js";
import { renderNotes } from "../view/render.js";
import { toggleArchiveStatus } from "./notes.js";
import "./login.js";
import "./responsive.js";

const notesListElement = document.querySelector("#notesList");
const loginForm = document.querySelector("login-form");

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

  // Sembunyikan navbar dan tombol
  const navbar = document.querySelector(".navbar");
  navbar.style.display = "none";
  logoutButton.style.display = "none";
  filterButton.style.display = "none";

  // Sembunyikan daftar catatan
  notesListElement.style.display = "none";

  // Tampilkan form login dan reset
  loginForm.style.display = "";
  loginForm.resetFields(); // Reset form fields dan pesan
}

// Buat navbar dan dapatkan referensi tombol
const { filterButton, logoutButton } = createNavbar(
  handleLogoutClick,
  handleFilterClick
);

// Inisialisasi tampilan awal
const navbar = document.querySelector(".navbar");

if (isLoggedIn) {
  // Jika sudah login
  loginForm.style.display = "none";
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
  logoutButton.style.display = "block";
  filterButton.style.display = "block";
  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
} else {
  // Jika belum login
  loginForm.style.display = "";
  navbar.style.display = "none";
  notesListElement.style.display = "none";
}

// Event listener untuk login berhasil
document.addEventListener("login-success", () => {
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  // Sembunyikan form login
  loginForm.style.display = "none";

  // Tampilkan navbar dan daftar catatan
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
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
