// updated from using sampleTransactions to using local storage

const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const sampleTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
// check to see if there is something in localStorage aka its not null 
// if it is empty -- set to empty object
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
// let transactions = sampleTransactions;


// FUNCTIONS

// add transactions
function addTransaction(e) {
    e.preventDefault();

    // check to see if empty
    //.trim() removes any whitespace from both sides of a string
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert("please add a text and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            // + turns amount.value from a string to a number
            amount: +amount.value
        };
        // console.log(transaction);

        // add transaction to transactions array
        transactions.push(transaction);
        // run addTransactionDOM with the transacton as the input
        addTransactionDOM(transaction);
        // then run updateValues
        updateValues();

        updateLocalStorage();

        // finally clear the inputs to reset form
        text.value = '';
        amount.value = '';

    };
};


// generate random id
function generateID() {
    return Math.floor(Math.random() * 1000000000);
};


// add transactions to DOM list
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    // create elements
    const item = document.createElement('li');

    // add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    // use math.absolute to get rid of extra sign from the sampleTransactions
    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

// update balance, income, and expense
function updateValues() {
    // .map filters out the amounts from transaction arrays and creates a new array with them
    const amounts = transactions.map(transaction => transaction.amount);

    // https://alligator.io/js/finally-understand-reduce/
    // method reduces an array of values down to just one value. 
    // To get the output value, it runs a reducer function on each element of the array.
    // syntax: arr.reduce(callback[, initialValue])
    // take accumulater and item (from array) -- then append item to the accumulator and fix to 2 decimals
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // console.log(total);

    // similar to above
    // filter out items that are positive amounts (plus) and run reduce on them
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    // console.log(income);
    
    // similar to above but multiply by -1 at end to get minus
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    // console.log(expense);


    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}

// remove transaction by id
function removeTransaction(id) {
    // adds everything to array except for the delete button clicked with matching id
    transactions = transactions.filter(transaction => transaction.id !== id);

    // update localStorage each time you remove an item
    updateLocalStorage();

    // then reinitialize to update page
    init();
}


// update localStorageTransactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// Init app -- adds everything to page
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

// add everything in transactions array to page
init();


// EVENT LISTENERS

form.addEventListener('submit', addTransaction);