// Fungsi untuk membuat elemen navbar
export function createNavbar(
  logoutHandler,
  filterHandler,
  toggleAddNoteFormHandler
) {
  const navbar = document.createElement("nav");
  navbar.classList.add("navbar");

  // Logo
  const logo = document.createElement("div");
  logo.textContent = "Notes App";
  logo.classList.add("navbar-logo");

  // Container untuk tombol
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("navbar-buttons");

  // Tombol Filter
  const filterButton = document.createElement("button");
  filterButton.textContent = "Tampilkan Catatan Diarsipkan";
  filterButton.classList.add("navbar-button");
  filterButton.addEventListener("click", filterHandler);

  // Tombol Tambah Catatan
  const addNoteButton = document.createElement("button");
  addNoteButton.textContent = "Tambah Catatan";
  addNoteButton.classList.add("navbar-button");
  addNoteButton.addEventListener("click", toggleAddNoteFormHandler);

  // Tombol Logout
  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";
  logoutButton.classList.add("navbar-button");
  logoutButton.style.display = "none"; // Sembunyikan secara default
  logoutButton.addEventListener("click", logoutHandler);

  // Tambahkan tombol ke container
  buttonsContainer.append(filterButton, addNoteButton, logoutButton);

  // Tambahkan elemen ke navbar
  navbar.append(logo, buttonsContainer);

  // Tambahkan navbar ke body
  document.body.prepend(navbar);

  // Kembalikan referensi tombol
  return { filterButton, addNoteButton, logoutButton };
}
