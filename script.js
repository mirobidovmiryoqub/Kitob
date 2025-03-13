const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function removeBookFromLibrary(bookId) {
    myLibrary.splice(myLibrary.findIndex(book => book.id === bookId), 1);
    displayBooks();
}

function toggleBookReadStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.toggleReadStatus();
        displayBooks();
    }
}

function displayBooks() {
    const libraryContainer = document.getElementById('library');
    libraryContainer.innerHTML = '';
    
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.id = book.id;
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: <strong>${book.read ? "Read" : "Not Read"}</strong></p>
            <button class="toggle-read" data-id="${book.id}">${book.read ? "Mark as Unread" : "Mark as Read"}</button>
            <button class="remove-book" data-id="${book.id}">Remove</button>
        `;
        
        libraryContainer.appendChild(bookCard);
    });
    
    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.dataset.id;
            removeBookFromLibrary(bookId);
        });
    });
    
    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.dataset.id;
            toggleBookReadStatus(bookId);
        });
    });
}

// Form handling
const bookDialog = document.getElementById('bookDialog');
const newBookButton = document.getElementById('newBookButton');
const closeDialogButton = document.getElementById('closeDialog');
const addBookForm = document.getElementById('addBookForm');

newBookButton.addEventListener('click', () => {
    bookDialog.showModal();
});

closeDialogButton.addEventListener('click', () => {
    bookDialog.close();
});

addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);
    bookDialog.close();
    addBookForm.reset();
});

// Example books for testing
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

displayBooks();
