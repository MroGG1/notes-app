export function createNavbar(logoutHandler, filterHandler) {
  const navbar = document.createElement("nav");
  navbar.classList.add("navbar");

  // Logo
  const logo = document.createElement("div");
  logo.textContent = "Notes App";
  logo.classList.add("navbar-logo");

  // Tombol Filter
  const filterButton = document.createElement("button");
  filterButton.textContent = "Tampilkan Catatan Diarsipkan";
  filterButton.classList.add("navbar-button");
  filterButton.addEventListener("click", filterHandler);

  // Tombol Logout
  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";
  logoutButton.classList.add("navbar-button");
  logoutButton.style.display = "none"; // Tetap sembunyikan secara default
  logoutButton.addEventListener("click", logoutHandler);

  // Tambahkan elemen ke navbar
  navbar.append(logo, filterButton, logoutButton);

  // Tambahkan navbar ke body
  document.body.prepend(navbar);

  // Kembalikan referensi tombol
  return { filterButton, logoutButton };
}
