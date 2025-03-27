class SearchBar extends HTMLElement {
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
        .search-container {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
        }
        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          flex: 1;
        }
        button {
          padding: 8px 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="search-container">
        <input type="text" id="searchInput" placeholder="Cari catatan..." />
        <button id="searchButton">Cari</button>
      </div>
    `;

    const searchInput = this.shadowRoot.querySelector("#searchInput");
    const searchButton = this.shadowRoot.querySelector("#searchButton");

    searchButton.addEventListener("click", () => {
      const keyword = searchInput.value.trim();
      this.dispatchEvent(
        new CustomEvent("search", { detail: keyword, bubbles: true })
      );
    });
  }
}

customElements.define("search-bar", SearchBar);
