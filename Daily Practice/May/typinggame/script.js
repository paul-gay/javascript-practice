const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endGameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
    'distributor',
    'eavesdrop',
    'solid',
    'argument',
    'tray',
    'please',
    'countryside',
    'speculate',
    'soldier',
    'bird',
    'brainstorm',
    'situation',
    'amputate',
    'hip',
    'quarrel',
    'classify',
    'congress',
    'throat',
    'month',
    'transaction',
    'leaflet',
    'stable',
    'series',
    'weak',
    'paint',
    'seed',
    'horoscope',
    'convince'
];


/* Init word */
let randomWord;

/* Init score */
let score = 0;

/* Init time */
let time = 10;

/* init diffculty */
// pull difficulty level from local storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
// update difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

/* focus on text input on start */
text.focus();

/* start counting down for time */
const timeInterval = setInterval(updateTime, 1000);


/* generate random word from words array */
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
};
// console.log(getRandomWord());


/* add random word to DOM */
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
};

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
};

function updateTime() {
    // decrease time by 1 each second
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    };
};

function gameOver() {
    endGameEl.innerHTML = `
        <h1>Time Ran Out</h1>
        <p>You're final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

    endGameEl.style.display = 'flex';
};

addWordToDOM();


/* Event Listeners */

// user typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    // console.log(insertedText);
    if(insertedText === randomWord) {
        addWordToDOM();

        updateScore();

        // clear e.target.value to reset
        e.target.value = '';

        // add time if user gets word right
        if (difficulty === 'hard') {
            time +=2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time +=5;
        }

        updateTime();
    };
});

// settings button click and hide
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

// change difficulty settings
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    // console.log(difficulty);

    // save difficulty level to local storage
    localStorage.setItem('difficulty', difficulty);
});

