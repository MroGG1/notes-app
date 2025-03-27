import { notesData } from "../data/data.js";
import { createNavbar } from "../view/main.js";
import { renderNotes } from "../view/render.js";
import { toggleArchiveStatus } from "../components/notes.js";
import { createNoteItemElement, deleteNote, editNote } from "./notes.js";
import "../components/login.js";
import "./responsive.js";
import "../components/addNoteForm.js";
import "./noteDetails.js";
import "./searchBar.js";
import "./themeSwitcher.js";

const notesListElement = document.querySelector("#notesList");
const loginForm = document.querySelector("login-form");
const addNoteForm = document.querySelector("add-note-form");
const searchBar = document.querySelector("search-bar");
const themeSwitcher = document.querySelector("theme-switcher");

let showArchived = false;
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
let isAddNoteFormVisible = false;

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

function toggleAddNoteForm() {
  isAddNoteFormVisible = !isAddNoteFormVisible;
  addNoteForm.style.display = isAddNoteFormVisible ? "block" : "none";
}

function handleLogoutClick() {
  const confirmLogout = window.confirm("Apakah kamu akan log out?");
  if (confirmLogout) {
    isLoggedIn = false;
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

    navbar.style.display = "none";
    logoutButton.style.display = "none";
    filterButton.style.display = "none";
    notesListElement.style.display = "none";
    addNoteForm.style.display = "none";
    searchBar.style.display = "none";
    themeSwitcher.style.display = "none";
    loginForm.style.display = "";
    loginForm.resetFields();
  }
}

const { filterButton, addNoteButton, logoutButton } = createNavbar(
  handleLogoutClick,
  handleFilterClick,
  toggleAddNoteForm
);

const navbar = document.querySelector(".navbar");

if (isLoggedIn) {
  loginForm.style.display = "none";
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
  logoutButton.style.display = "block";
  filterButton.style.display = "block";
  addNoteForm.style.display = "none";
  searchBar.style.display = "block";
  themeSwitcher.style.display = "block";

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
  addNoteForm.style.display = "none";
  searchBar.style.display = "none";
  themeSwitcher.style.display = "none";
}

document.addEventListener("login-success", () => {
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

  loginForm.style.display = "none";
  navbar.style.display = "flex";
  notesListElement.style.display = "grid";
  logoutButton.style.display = "block";
  filterButton.style.display = "block";
  addNoteForm.style.display = "none";
  searchBar.style.display = "block";
  themeSwitcher.style.display = "block";

  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
});

document.addEventListener("add-note", (event) => {
  notesData.push(event.detail);
  renderNotes(
    notesData,
    showArchived,
    isLoggedIn,
    notesListElement,
    toggleArchiveStatus
  );
});
