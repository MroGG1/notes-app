class LoginForm extends HTMLElement {
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
            .login-container {
                width: 300px;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: white;
                box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
                border-radius: 8px;
                text-align: center;
            }
            input {
                width: 100%;
                padding: 10px;
                margin: 8px 0;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
            button {
                width: 100%;
                padding: 10px;
                background: blue;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background: darkblue;
            }
        </style>
      <form>
        <div class="login-container">
            <h2>Welcome to Notes</h2>
            <input type="text" name="username" id="username" pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$" placeholder="Username" required autocomplete="off"/>
            <input type="password" name="password" id="password" placeholder="Password" required/>
            <button id="loginButton">Login</button>
            <p id="message"></p>
        </div>
      </form>
        `;

    this.shadowRoot
      .querySelector("#loginButton")
      .addEventListener("click", (event) => {
        event.preventDefault(); // Mencegah form submit
        this.login();
      });
  }

  login() {
    const username = this.shadowRoot.querySelector("#username").value;
    const password = this.shadowRoot.querySelector("#password").value;
    const message = this.shadowRoot.querySelector("#message");

    if (username === "admin" && password === "1234") {
      message.textContent = "Login Berhasil!";
      message.style.color = "green";
      this.dispatchEvent(
        new CustomEvent("login-success", { bubbles: true, composed: true })
      );
    } else {
      message.textContent = "Username atau Password Salah!";
      message.style.color = "red";
    }
  }

  resetFields() {
    const usernameInput = this.shadowRoot.querySelector("#username");
    const passwordInput = this.shadowRoot.querySelector("#password");
    const messageElement = this.shadowRoot.querySelector(".message");

    if (usernameInput && passwordInput) {
      usernameInput.value = "";
      passwordInput.value = "";
    }

    if (messageElement) {
      messageElement.textContent = "";
      messageElement.className = "message";
    }
  }
}

customElements.define("login-form", LoginForm);
