import { notesData } from "../data/data.js";
import { createNavbar } from "../view/main.js";
import { renderNotes } from "../view/render.js";
import { toggleArchiveStatus } from "../components/notes.js";
import "../components/login.js";
import "./responsive.js";
import "../components/addNoteForm.js"; // Import komponen formulir tambah catatan

const notesListElement = document.querySelector("#notesList");
const loginForm = document.querySelector("login-form");
const addNoteForm = document.querySelector("add-note-form"); // Ambil elemen formulir tambah catatan

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

  // Sembunyikan navbar, tombol, dan daftar catatan
  const navbar = document.querySelector(".navbar");
  navbar.style.display = "none";
  logoutButton.style.display = "none";
  filterButton.style.display = "none";
  notesListElement.style.display = "none"; // Tambahkan ini untuk menyembunyikan daftar catatan
  addNoteForm.style.display = "none"; // Sembunyikan formulir tambah catatan

  // Tampilkan kembali form login
  loginForm.style.display = "";
  loginForm.resetFields();
}

// Buat navbar dan dapatkan referensi tombol
const { filterButton, logoutButton } = createNavbar(
  handleLogoutClick,
  handleFilterClick
);

// Inisialisasi tampilan awal
const navbar = document.querySelector(".navbar");

if (isLoggedIn) {
  loginForm.style.display = "none";
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
  addNoteForm.style.display = "block"; // Tampilkan formulir tambah catatan
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
  loginForm.style.display = "";
  navbar.style.display = "none";
  notesListElement.style.display = "none";
}

// Event listener untuk login berhasil
document.addEventListener("login-success", () => {
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  loginForm.style.display = "none";
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
  addNoteForm.style.display = "block"; // Tampilkan formulir tambah catatan
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
