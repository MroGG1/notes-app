function adjustLayout() {
  const notesListElement = document.querySelector("#notesList");
  const width = window.innerWidth;

  if (width < 600) {
    notesListElement.style.gridTemplateColumns = "1fr";
  } else if (width < 900) {
    notesListElement.style.gridTemplateColumns = "1fr 1fr";
  } else {
    notesListElement.style.gridTemplateColumns = "1fr 1fr 1fr";
  }
}

window.addEventListener("resize", adjustLayout);
window.addEventListener("DOMContentLoaded", adjustLayout);
