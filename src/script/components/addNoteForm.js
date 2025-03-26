class AddNoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .form-container input,
        .form-container textarea,
        .form-container button {
          font-size: 16px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .form-container button {
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }

        .form-container button:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="form-container">
        <input type="text" id="title" placeholder="Judul Catatan" required />
        <textarea id="body" rows="5" placeholder="Isi Catatan" required></textarea>
        <button id="addNoteButton">Tambah Catatan</button>
      </div>
    `;

    const addNoteButton = this.shadowRoot.querySelector("#addNoteButton");
    addNoteButton.addEventListener("click", () => this.addNote());
  }

  addNote() {
    const title = this.shadowRoot.querySelector("#title").value.trim();
    const body = this.shadowRoot.querySelector("#body").value.trim();

    if (title && body) {
      const newNote = {
        id: Date.now(),
        title,
        body,
        createdAt: new Date().toISOString().split("T")[0],
        archived: false,
      };

      const addNoteEvent = new CustomEvent("add-note", { detail: newNote });
      document.dispatchEvent(addNoteEvent);

      // Reset input setelah menambahkan catatan
      this.shadowRoot.querySelector("#title").value = "";
      this.shadowRoot.querySelector("#body").value = "";
    } else {
      alert("Judul dan isi catatan tidak boleh kosong!");
    }
  }
}

customElements.define("add-note-form", AddNoteForm);