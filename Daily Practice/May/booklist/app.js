/**
 * Book Constructor
 * this will handle created the book object(s)
 */
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};


 /**
  * UI Constructor
  * a set of prototype methods to handle:
  * add book to list
  * delete book
  * show alert
  * any UI functions
  */
 // empty function since the actual functions will be inside prototype
 function UI () {}

 // add book to list
 UI.prototype.addBookToList = function(book) {
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

 // show alert
UI.prototype.showAlert = function(message, className) {
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
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
};

// delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        // get the 'tr' element to delete
        target.parentElement.parentElement.remove();
    };
};


 // clear fields
 UI.prototype.clearFields = function() {
     document.getElementById('title').value = '';
     document.getElementById('author').value = '';
     document.getElementById('isbn').value = '';   
 };


 /* Event Listener for add book */
 document.getElementById('book-form').addEventListener('submit', function(e) {
    // get the form values -- use destructuring
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // create an instance of a Book
    const book = new Book(title, author, isbn);
    
    // create an instance of UI object
    const ui = new UI();

    // validate
    if(title === '' || author === '' || isbn === '') {
        // add error alert to UI
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // add book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert('Book Added!', 'success');

        // clear fields once added to list
        ui.clearFields();
    }


    e.preventDefault();
 });

 /* Event Listener for Delete */
document.getElementById('book-list').addEventListener('click', function(e){
    // create instance of UI
    const ui = new UI();

    // delete the row of the target
    ui.deleteBook(e.target);

    // show delete confirmation
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});