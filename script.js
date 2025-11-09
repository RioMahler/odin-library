const newBookButton = document.getElementById("newBook");
const dialog = document.querySelector("dialog");
const submitButton = document.getElementById("submit");

const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

let container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

submitButton.addEventListener("click", submitData);

const myLibrary = [];

function Book(author, title, pages, read) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
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
  let readStatus = read.value;
  addBookToLibrary(authorName, titleName, pageCount, readStatus);
  dialog.close();
  event.preventDefault();
}

function displayBooks(book) {
  let title = document.createElement("h2");
  let author = document.createElement("h3");
  let pages = document.createElement("p");
  let newBook = document.createElement("div");
  newBook.className = "books";
  container.appendChild(newBook);
  newBook.appendChild(title);
  newBook.appendChild(author);
  newBook.appendChild(pages);
  title.innerText = book.title;
  author.innerText = book.author;
  pages.innerText = book.pages + " pages";
}
