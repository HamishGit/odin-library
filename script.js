const myLibrary = [
];

function Book(title, author, numPages, id) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.id = id;
}

function addBookToLibrary(title, author, numPages) {
    const id = crypto.randomUUID();
    let newBook = new Book(title, author, numPages, id);
    myLibrary.push(newBook);
}

function displayBooks() {
    const cards = document.getElementById("cards");
    for (const book of myLibrary) {
        cards.innerHTML += `
            <section class="card">
                <h2>${book.title}</h2>
                <h4>by ${book.author}</h4>
                <p>${book.numPages} pages</p>
            </section>
        `;
    }
}

const theHobbit = addBookToLibrary("The Hobbit", "J.R.R Tolkien", 250);

for (let i = 0; i < 15; i++) {
    addBookToLibrary("Another Book", "Another Author", 300)
}
displayBooks();