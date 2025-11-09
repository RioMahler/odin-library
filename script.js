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
