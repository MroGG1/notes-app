function adjustLayout() {
  const notesListElement = document.querySelector("#notesList");
  console.log("Adjusting layout for width:", window.innerWidth); // Debugging
  console.log("Notes list element:", notesListElement); // Debugging

  if (!notesListElement) {
    console.error("Element #notesList not found in DOM!");
    return;
  }

  const width = window.innerWidth;

  if (width < 600) {
    notesListElement.style.gridTemplateColumns = "1fr"; // 1 kolom
  } else if (width < 900) {
    notesListElement.style.gridTemplateColumns = "1fr 1fr"; // 2 kolom
  } else {
    notesListElement.style.gridTemplateColumns = "1fr 1fr 1fr"; // 3 kolom
  }
}

// Tambahkan event listener untuk menyesuaikan tata letak
window.addEventListener("resize", () => {
  console.log("Window resized"); // Debugging
  adjustLayout();
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); // Debugging
  adjustLayout();
});
