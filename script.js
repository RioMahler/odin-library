const newBookButton = document.getElementById("newBook");
const dialog = document.querySelector("dialog");
const submitButton = document.getElementById("submit");

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

function addBookToLibrary() {}

function submitData(event) {
  event.close();
  event.preventDefault();
}
