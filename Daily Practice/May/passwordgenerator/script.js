// VARIABLES

// DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// put each generator function into an object
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// EVENTS

// generate event listener
generateEl.addEventListener('click', () => {
    // need to turn from string to number using '+' or tenary operator
    const length = +lengthEl.value;
    // https://flaviocopes.com/how-to-check-checkbox-checked/
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // console.log(hasLower, hasUpper, hasNumber, hasSymbol);
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});



// FUNCTIONS

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

// generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // initialize password variable -- give a string to build password upon
    let generatedPassword = '';

    // filter out unchecked types
    const typesCount = lower + upper + number + symbol;
    // counts number of checked values
    // console.log('typescount: ', typesCount);
    // create an array based on typesCount
    // gives an arry with keys of: lower, upper, number, symbol
    // .filter is high order array method -- loop through each item and then based on if it has a true or false value
    // it will filter out any value that equals false
    // https://alligator.io/js/filter-array-method/
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    console.log(typesArr);
    // if none checked -- don't generate a password
    if(typesCount === 0) {
        return '';
    }

    // loop over length and call generator function for each type
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            generatedPassword += randomFunc[funcName]();
        });
    }

    // add the final password to password variable and return it
    const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword
}

// Generator Functions

function getRandomLower() {
/*
    https://www.freecodecamp.org/news/javascript-standard-objects-strings/
    The String.fromCharCode() method returns a string created by using the specified sequence of Unicode values
    - multiply 26 for 26 letters in alphabet
    - add 97 since charcodes for lowercase are between 97 and 124
*/
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}


function getRandomNumber() {
    // numbers go from 0 - 10
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    // get character of string like you would an array
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomUpper());

