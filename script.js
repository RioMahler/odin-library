const newBookButton = document.getElementById("newBook");
const dialog = document.querySelector("dialog");
const submitButton = document.getElementById("submit");

const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

let authorError = document.querySelector(".authorError");
let titleError = document.querySelector(".titleError");
let pageError = document.querySelector(".pagesError");

author.addEventListener("input", (e) => {
  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    showError();
  }
});
title.addEventListener("input", (e) => {
  if (title.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    showError();
  }
});
pages.addEventListener("input", (e) => {
  if (pages.validity.valid) {
    pageError.textContent = "";
    pageError.className = "error";
  } else {
    showError();
  }
});

function showError() {
  if (author.validity.valueMissing) {
    authorError.textContent = "You need to enter an author.";
  }
  if (title.validity.valueMissing) {
    titleError.textContent = "You need to enter a title.";
  }
  if (pages.validity.valueMissing) {
    pageError.textContent = "You need to enter the pagecount.";
  } else if (pages.validity.patternMismatch) {
    pageError.textContent = "Pagecount has to be a whole number.";
  }
}

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

let container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

submitButton.addEventListener("click", submitData);

const myLibrary = [];

class Book {
  constructor(author, title, pages, read) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(authorName, titleName, pageCount, readStatus) {
  titleName = new Book(authorName, titleName, pageCount, readStatus);
  myLibrary.push(titleName);
  let books = document.querySelectorAll(".books");
  books.forEach((book) => book.remove());
  myLibrary.forEach(displayBooks);
}

function submitData(event) {
  let authorName = author.value;
  let titleName = title.value;
  let pageCount = pages.value;
  let readStatus = read.checked;

  if (author.validity.valid && title.validity.valid && pages.validity.valid) {
    addBookToLibrary(authorName, titleName, pageCount, readStatus);
    dialog.close();
  }
  event.preventDefault();
}

function displayBooks(book) {
  let title = document.createElement("h2");
  let author = document.createElement("h3");
  let pages = document.createElement("p");
  let read = document.createElement("p");
  let removeButton = document.createElement("button");
  let readButton = document.createElement("button");
  let newBook = document.createElement("div");
  read.className = "readStatus";
  newBook.dataset.id = book.id;
  newBook.className = "books";
  container.appendChild(newBook);
  newBook.appendChild(title);
  newBook.appendChild(author);
  newBook.appendChild(pages);
  newBook.appendChild(read);
  newBook.appendChild(removeButton);
  newBook.appendChild(readButton);
  title.innerText = book.title;
  author.innerText = book.author;
  pages.innerText = book.pages + " pages";
  if (book.read == true) {
    read.innerText = "Status: Read";
  } else if (book.read == false) {
    read.innerText = "Status: Not read";
  }
  removeButton.innerText = "Remove";
  removeButton.addEventListener("click", removeBook);
  readButton.innerText = "Toggle Reading Status";
  readButton.addEventListener("click", readBook);
}

function removeBook(event) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (event.target.parentElement.dataset.id == myLibrary[i].id) {
      event.target.parentElement.remove();
      const removed = myLibrary.splice(i, 1);
    }
  }
}

function readBook(event) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (event.target.parentElement.dataset.id == myLibrary[i].id) {
      let read = event.target.parentElement.querySelector(".readStatus");
      if (read.innerText == "Status: Read") {
        read.innerText = "Status: Not read";
        myLibrary[i].read = false;
      } else {
        read.innerText = "Status: Read";
        myLibrary[i].read = true;
      }
    }
  }
}
