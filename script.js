const dialog = document.getElementById("dialog");
const newBookBtn = document.querySelector(".new-book-btn");
const newBookForm = document.getElementById("new-book-form");
const newBookSubmitBtn = document.getElementById("new-book-submit-btn");
const cancelBtn = document.getElementById("cancel");

const myLibrary = [
];

function Book(title, author, numPages, read, id) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.id = id;
    this.read = read
}

function addBookToLibrary(title, author, numPages, read) {
    const id = crypto.randomUUID();
    let newBook = new Book(title, author, numPages, read, id);
    myLibrary.push(newBook);
}

function displayBooks() {
    const cards = document.getElementById("cards");
    cards.innerHTML = "";
    for (const book of myLibrary) {
        cards.innerHTML += `
            <section class="card">
                <article class="book-info">
                    <h2>${book.title}</h2>
                    <h4>by ${book.author}</h4>
                    <p>${book.numPages} pages</p>
                    <p class="read-status">${book.read ? "has been read" : "has not been read"}</p>
                </article>
                <article class="card-action-btns">
                    <button type="button" class="delete" data-id="${book.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>
                    </button>
                </article>
            </section>
        `;
    }
}

const theHobbit = addBookToLibrary("The Hobbit", "J.R.R Tolkien", 250, false);
for (let i = 0; i < 15; i++) {
    addBookToLibrary("Test Book", "Test Author", "320", (i % 2 === 0) ? true : false)
}

displayBooks();

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("overflow-y-hidden");
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
    newBookForm.reset();
    document.body.classList.remove("overflow-y-hidden");
})

dialog.addEventListener("close", () => {
    if (dialog.returnValue === "submit") {
        document.body.classList.remove("overflow-y-hidden");
        const formData = new FormData(newBookForm);
        const data = Object.fromEntries(formData.entries());

        addBookToLibrary(data.title, data.author, data["num-pages"], data["has-been-read"]);
        displayBooks();

        newBookForm.reset();
        dialog.returnValue = "";
    }
});

const cardsContainer = document.getElementById("cards");

cardsContainer.addEventListener("click", (e) => {
    // We use this line to filter through elements that do not have the class ".delete"
    const deleteBtn = e.target.closest(".delete");

    if (deleteBtn) {

        const bookId = deleteBtn.dataset.id;
        const foundIndex = myLibrary.findIndex((item) => item.id === bookId);

        if (foundIndex > -1) {
            myLibrary.splice(foundIndex, 1);
            displayBooks();
        }
    }
});