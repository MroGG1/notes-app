import { notesData } from "../data/data.js";
import { createNavbar } from "../view/main.js";
import { renderNotes } from "../view/render.js";
import { toggleArchiveStatus } from "../components/notes.js";
import "../components/login.js";
import "./responsive.js";
import "../components/addNoteForm.js"; // Import komponen formulir tambah catatan
import { createNoteItemElement, deleteNote, editNote } from "./notes.js";

const notesListElement = document.querySelector("#notesList");
const loginForm = document.querySelector("login-form");
const addNoteForm = document.querySelector("add-note-form"); // Ambil elemen formulir tambah catatan

let showArchived = false;
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
let isAddNoteFormVisible = false; // Status untuk formulir tambah catatan

// Handler untuk tombol filter
function handleFilterClick() {
  showArchived = !showArchived;
  filterButton.textContent = showArchived
    ? "Tampilkan Catatan Tidak Diarsipkan"
    : "Tampilkan Catatan Diarsipkan";

  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
}

// Handler untuk tombol tambah catatan
function toggleAddNoteForm() {
  isAddNoteFormVisible = !isAddNoteFormVisible;
  addNoteForm.style.display = isAddNoteFormVisible ? "block" : "none";
}

// Handler untuk tombol logout
function handleLogoutClick() {
  const confirmLogout = window.confirm(
    "Apakah kamu akan log out? Pilih Yes untuk log out atau No untuk tetap masuk."
  );
  if (confirmLogout) {
    isLoggedIn = false;
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

    navbar.style.display = "none";
    logoutButton.style.display = "none";
    filterButton.style.display = "none";
    notesListElement.style.display = "none";
    addNoteForm.style.display = "none"; // Sembunyikan formulir tambah catatan
    loginForm.style.display = "";
    loginForm.resetFields();
  }
}

// Buat navbar dan dapatkan referensi tombol
const { filterButton, addNoteButton, logoutButton } = createNavbar(
  handleLogoutClick,
  handleFilterClick,
  toggleAddNoteForm
);

// Inisialisasi tampilan awal
const navbar = document.querySelector(".navbar");

if (isLoggedIn) {
  loginForm.style.display = "none";
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
  logoutButton.style.display = "block";
  filterButton.style.display = "block";
  addNoteForm.style.display = "none"; // Sembunyikan formulir tambah catatan secara default

  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
} else {
  loginForm.style.display = "";
  navbar.style.display = "none";
  notesListElement.style.display = "none";
  addNoteForm.style.display = "none"; // Sembunyikan formulir tambah catatan
}

// Event listener untuk login berhasil
document.addEventListener("login-success", () => {
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  loginForm.style.display = "none";
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
  logoutButton.style.display = "block";
  filterButton.style.display = "block";
  addNoteForm.style.display = "none"; // Sembunyikan formulir tambah catatan secara default

  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
});

// Event listener untuk menambahkan catatan baru
document.addEventListener("add-note", (event) => {
  notesData.push(event.detail); // Tambahkan catatan baru ke data
  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
});
