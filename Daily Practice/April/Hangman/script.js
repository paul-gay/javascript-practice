// grab DOM elements
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// grab figure parts to add when user gets wrong word/letter
const figureParts = document.querySelectorAll('.figure-part');

// define words -- need to load new word each time page loads
const words = ['application', 'programming', 'interface', 'wizard'];

// need a selected word to start with
let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// show hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
                `
            ).join('')}
    `;
    
    // get letters to show up on single line rather than creating new line for each letter
    // replace the new line character (n) globally with empty string
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    // console.log(wordEl.innerText, innerWord);

    // check to see if word is correct -- user won
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congrats you won!';
        popup.style.display = 'flex';
    }


}

// update wrongLetters
function updateWrongLettersEl() {
    // console.log('update wrong');

    //check to see if anything is in wrongLettersEl
    // if there is -- wrongLetters.length > 0 add paragraph that says wrong
    // if there isn't then nothing displayed

    ///// display wrong letters //////
    // then map through each letter in wrongLetters array 
    // and add each wrong letter to wrong letter element
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // add drawing each time user enters wrong letter

    ///// Display drawing //////
    // loop through with forEach method -- for each part we also want the index
    figureParts.forEach((part, index) => {
        // then check to see how many errors there are
        const errors = wrongLetters.length;

        // check to see if index -- each part has an index since looping through
        // check to see if index is less than the errors
        if(index < errors) {
            // change from default display:none to display:block
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // check if user lost -- ran out of chances
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you have lost';
        popup.style.display ='flex';
    }
}


// show notification
function showNotification() {
    notification.classList.add('show');

    // remove class after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


// keydown letter press
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 & e.keyCode <= 90) {
        // console.log('123')

        // store key in letter variable
        const letter = e.key;

        // check to see if letter pressed is in selectedWord array
        if(selectedWord.includes(letter)){
            // if that letter is not already in correctLetters array -- push letter to it
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                // run display word function
                displayWord();
            } else {
                showNotification();
            }
        } else {
            // check to see if wrong letter is in array -- if not then push to wrongLetters array
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
    // console.log(e.keyCode);
});


// restart game and play again
playAgainBtn.addEventListener('click', () => {
    // empty out arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    // grab new random word
    selectedWord = words[Math.floor(Math.random() * words.length)];

    // call displayWord function like you do when page loads
    displayWord();

    // clean up wrongLetters and hide figurine again
    updateWrongLettersEl();
    popup.style.display = 'none';


});



displayWord();



// 