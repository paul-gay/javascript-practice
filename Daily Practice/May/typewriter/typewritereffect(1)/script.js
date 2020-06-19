const text = ['restaurants', 'food entrepreneurs', 'food bloggers'];

let count = 0;
let index = 0;
let currentText = '';
let letter = '';

// IIFE function -- function runs immediately, not somwhere else in code
(function type() {
    // whenever count equal length of array set count back to 0 -- to effectively create a loop
    if(count === text.length) {
        count = 0;
    }
    currentText = text[count];
    // go over each letter in the word and add to letter
    /*
    * The slice() method returns a shallow copy of a portion of an array into 
    * a new array object selected from begin to end (end not included) where begin and end represent the index of items in that array. 
    * The original array will not be modified
    */
    letter = currentText.slice(0, index++);

    document.querySelector('.typing').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
    };
    setTimeout(type, 400);
}());
