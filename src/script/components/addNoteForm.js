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

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: -5px;
        }
      </style>
      <div class="form-container">
        <input type="text" id="title" placeholder="Judul Catatan" required />
        <p id="titleError" class="error-message" style="display: none;">Judul tidak boleh kosong!</p>
        <textarea id="body" rows="5" placeholder="Isi Catatan" required></textarea>
        <p id="bodyError" class="error-message" style="display: none;">Isi catatan tidak boleh kosong!</p>
        <button id="addNoteButton">Tambah Catatan</button>
      </div>
    `;

    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");
    const addNoteButton = this.shadowRoot.querySelector("#addNoteButton");

    titleInput.addEventListener("input", () => this.validateTitle());
    bodyInput.addEventListener("input", () => this.validateBody());

    addNoteButton.addEventListener("click", () => this.addNote());
  }

  validateTitle() {
    const titleInput = this.shadowRoot.querySelector("#title");
    const titleError = this.shadowRoot.querySelector("#titleError");

    if (titleInput.value.trim() === "") {
      titleError.style.display = "block";
    } else {
      titleError.style.display = "none";
    }
  }

  validateBody() {
    const bodyInput = this.shadowRoot.querySelector("#body");
    const bodyError = this.shadowRoot.querySelector("#bodyError");

    if (bodyInput.value.trim() === "") {
      bodyError.style.display = "block";
    } else {
      bodyError.style.display = "none";
    }
  }

  addNote() {
    const titleInput = this.shadowRoot.querySelector("#title");
    const bodyInput = this.shadowRoot.querySelector("#body");

    this.validateTitle();
    this.validateBody();

    if (titleInput.value.trim() === "" || bodyInput.value.trim() === "") {
      alert("Harap isi semua text dengan benar!");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: titleInput.value.trim(),
      body: bodyInput.value.trim(),
      createdAt: new Date().toISOString().split("T")[0],
      archived: false,
    };

    const addNoteEvent = new CustomEvent("add-note", { detail: newNote });
    document.dispatchEvent(addNoteEvent);

    titleInput.value = "";
    bodyInput.value = "";
    this.shadowRoot.querySelector("#titleError").style.display = "none";
    this.shadowRoot.querySelector("#bodyError").style.display = "none";
  }
}

customElements.define("add-note-form", AddNoteForm);
