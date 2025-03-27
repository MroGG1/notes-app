function adjustLayout() {
  const notesListElement = document.querySelector("#notesList");
  console.log("Adjusting layout for width:", window.innerWidth); 
  console.log("Notes list element:", notesListElement); 

  if (!notesListElement) {
    console.error("Element #notesList not found in DOM!");
    return;
  }

  const width = window.innerWidth;

  if (width < 600) {
    notesListElement.style.gridTemplateColumns = "1fr"; 
  } else if (width < 900) {
    notesListElement.style.gridTemplateColumns = "1fr 1fr"; 
  } else {
    notesListElement.style.gridTemplateColumns = "1fr 1fr 1fr"; 
  }
}


window.addEventListener("resize", () => {
  console.log("Window resized"); 
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); 
  adjustLayout();
});
