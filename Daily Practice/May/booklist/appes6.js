/* Book Class */
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


/* UI Class */
class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');

        // create <tr> element
        const row = document.createElement('tr');

        // insert coloumns into tr
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        // append to the list
        list.appendChild(row);
    }

    showAlert(message, className) {
        // create a div
        const div = document.createElement('div');
        // add classes
        div.className = `alert ${className}`;
        // add text to dive
        div.appendChild(document.createTextNode(message));
        // insert into DOM -- get parent
        const container = document.querySelector('.container');
        // add before the form
        const form = document.querySelector('#book-form');
        // insert alert before form
        container.insertBefore(div, form);

        // remove after 3 seconds
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            // get the 'tr' element to delete
            target.parentElement.parentElement.remove();
        };
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

/* Local Storage Class */
class Store {
    /**
     * can assign a method to the class function itself, not to its "prototype". 
     * these methods are called static.
     */

    // get books from localStorage
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;

            // add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        // set local storage
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        // set local storage
        localStorage.setItem('books', JSON.stringify(books));
    }
}

/* DOM Load Event */
document.addEventListener('DOMContentLoaded', Store.displayBooks);



/* Event Listener for add book */
document.getElementById('book-form').addEventListener('submit', function (e) {
    // get the form values -- use destructuring
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // create an instance of a Book
    const book = new Book(title, author, isbn);

    // create an instance of UI object
    const ui = new UI();

    // validate
    if (title === '' || author === '' || isbn === '') {
        // add error alert to UI
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // add book to list
        ui.addBookToList(book);

        // add book to localStorage
        Store.addBook(book);

        // show success
        ui.showAlert('Book Added!', 'success');

        // clear fields once added to list
        ui.clearFields();
    }


    e.preventDefault();
});

/* Event Listener for Delete */
document.getElementById('book-list').addEventListener('click', function (e) {
    // create instance of UI
    const ui = new UI();

    // delete the row of the target
    ui.deleteBook(e.target);

    // remove from local storage
    // get the isbn #
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show delete confirmation
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});