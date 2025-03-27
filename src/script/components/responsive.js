function adjustLayout() {
  const notesListElement = document.querySelector("#notesList");
  const screenWidth = window.innerWidth;

  if (screenWidth <= 600) {
    notesListElement.style.gridTemplateColumns = "1fr";
  } else if (screenWidth <= 900) {
    notesListElement.style.gridTemplateColumns = "1fr 1fr";
  } else {
    notesListElement.style.gridTemplateColumns = "1fr 1fr 1fr";
  }
}

window.addEventListener("resize", adjustLayout);

window.addEventListener("DOMContentLoaded", () => {
  adjustLayout();
});
