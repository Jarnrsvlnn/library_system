const openDialog = document.querySelector("#add-button");
const dialog = document.querySelector("#add-dialog");
const closeDialogBtn = document.querySelector("#close-button");
const addBookForm = document.querySelector("form");

const myLibrary = [];

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status)
    myLibrary.push(book)
}

function displayBook() {
    const parentContainer = document.querySelector(".parent-container");

    parentContainer.replaceChildren();

    for (const book of myLibrary) {
        const card = document.createElement("div");
        card.className = "book-card flex items-center flex-col h-100 w-70 p-10 m-5 border-black border-1"

        const title = book.title;
        const author = book.author;
        const pages = book.pages;
        const bookStatus = book.status ? "read" : "not read"

        const header = document.createElement("h1");
        header.className = "title text-3xl"
        header.textContent = title;

        const subHeader = document.createElement("h3");
        subHeader.textContent = author;

        const para = document.createElement("p");
        para.className = "pages m-auto"
        para.textContent = pages + " pages"

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "REMOVE"
        deleteBtn.className = "bg-red-500 text-white p-3"

        deleteBtn.addEventListener("click", () => {
            const deleteCardIndex = myLibrary.findIndex((item) => item.id === book.id);
            myLibrary.splice(deleteCardIndex, 1);
            displayBook();
        });

        card.append(header, subHeader, para, deleteBtn)
        parentContainer.append(card)

    }
}

openDialog.addEventListener("click", () => {
    console.log("click")
    dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;

    addBookToLibrary(title, author, pages, true);
    displayBook();
    dialog.close();
});