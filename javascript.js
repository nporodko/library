const addButton = document.getElementById("addBtn");
const addBook = document.getElementById("addBook");
const modal = document.getElementById("id01");
const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const isRead = document.getElementById("isYouReadIt");
const form = document.getElementById("addBookForm");
const containerLibrary = document.getElementById("library");

// login part

const btnLogIn = document.getElementById("logInBtn");
const submitBtn = document.getElementById("submit");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");
const message = document.querySelectorAll("small");
const logInForm = document.getElementById("logInForm");

btnLogIn.addEventListener("click", () => (modal.style.display = "flex"));

username.addEventListener("input", (event) => {
  if (username.validity.valueMissing) {
    message[0].textContent = "Enter your name";
  } else if (username.validity.tooShort) {
    message[0].textContent = "Your name has to be longer";
  } else {
    message[0].textContent = "";
  }
});

email.addEventListener("input", (event) => {
  if (email.validity.patternMismatch) {
    message[1].textContent = "I am expecting correct email address!";
  } else if (email.validity.valueMissing) {
    message[1].textContent = "Enter your email";
  } else {
    message[1].textContent = "";
  }
});

password.addEventListener("input", (event) => {
  if (password.validity.patternMismatch) {
    message[4].textContent =
      "Password has to have at least one lowercase letter, one uppercase letter,one digit and 8 characters";
  } else if (password.validity.valueMissing) {
    message[4].textContent = "Enter your password";
  } else {
    message[4].textContent = "";
  }
});

confirmPassword.addEventListener("input", (event) => {
  if (confirmPassword.value.trim() !== password.value.trim()) {
    message[5].textContent = "Password does not match";
  } else if (confirmPassword.validity.valueMissing) {
    message[5].textContent = "Confirm your password";
  } else {
    message[5].textContent = "";
  }
});

submitBtn.addEventListener("click", () => {
  if (logInForm.checkValidity()) {
    modal.style.display = "none";
  } else {
    alert("Fill all fields correct");
    modal.style.display = "flex";
  }
});

// library

let library = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  const inputAuthor = author.value;
  const inputTitle = title.value;
  const inputPages = pages.value;
  const inputIsRead = isRead.checked;
  library.push(new Book(inputAuthor, inputTitle, inputPages, inputIsRead));
}

addButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

function validateMyForm() {
  addBookToLibrary();
  renderLibrary();
  form.classList.toggle("hidden");

  author.value = "";
  title.value = "";
  pages.value = "";
  isRead.checked = false;
}

function renderLibrary() {
  containerLibrary.innerHTML = "";

  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    const authorText = document.createTextNode(book.author);
    authorDiv.appendChild(authorText);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    const titleText = document.createTextNode(book.title);
    titleDiv.appendChild(titleText);

    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages");
    const pagesText = document.createTextNode(book.pages);
    pagesDiv.appendChild(pagesText);

    const isReadBtn = document.createElement("button");
    isReadBtn.classList.add("isRead");
    const isReadText = document.createTextNode("Read");
    isReadBtn.appendChild(isReadText);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.appendChild(document.createTextNode("remove"));

    removeBtn.addEventListener("click", () => {
      library.splice(i, 1);
      renderLibrary();
    });

    if (book.isRead === true) {
      isReadBtn.classList.add("green");
      isReadBtn.textContent = "read";
    } else {
      isReadBtn.classList.add("red");
      isReadBtn.textContent = "not read";
    }

    isReadBtn.addEventListener("click", () => {
      if (book.isRead === true) {
        isReadBtn.classList.remove("green");
        isReadBtn.classList.add("red");
        book.isRead = false;
        isReadBtn.textContent = "not read";
      } else {
        isReadBtn.classList.remove("red");
        isReadBtn.classList.add("green");
        book.isRead = true;
        isReadBtn.textContent = "read";
      }
    });

    containerLibrary.appendChild(bookDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(isReadBtn);
    bookDiv.appendChild(removeBtn);
  }
}
