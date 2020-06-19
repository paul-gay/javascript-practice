const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

// initialize array for user information
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    // use async instead of using .then
    //
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    // console.log(newUser);
    addData(newUser);
};

// Double eveyones money
function doubleMoney() {
    data = data.map(user => {
      // spread operator copies everything inside user object and returns it
      // then takes money and updates it by multiplying by 2
      // take money then set it to money*2
      return { ...user, money: user.money * 2 };
    });
  
    updateDOM();
}

// sort users by richest
function sortByRichest() {
    // a-b descending and b - a acending
    data.sort((a,b) => b.money - a.money);

    updateDOM();
}

// filter by only millionaires using filter method
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// calcualte total wealth using reduce method
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    // console.log(formatMoney(wealth));

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML`<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealth);
}



// add new obj to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
};

// update DOM
// parameter sets a default
// if nothing passed in -- defaults to data array
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    // take provided data and loop through it
    // providedData.forEach(function(item) {});
    // use arrow function
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>
        ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}


// format number as money -
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// EVENT LISTENER
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);