/*
 make to items.json file
 */
/*
function calcualate() {
    fetch('items.json').then(function(res) {console.log(res)});
    refactor -- don't need paranthesis if only one parameter and use arrow function
    fetch('items.json').then(res => console.log(res));
    need to format response to data type you want
    fetch('items.json')
    .then(res => res.json())
    gives you the data you want
    .then(data => console.log(data));
    .then(data => (document.body.innerHTML = data[0].text));
}

calcualate();
*/

/*
 make http request using fetch api and get a http response from external api
 */

 const currencyEl_one = document.getElementById('currency-one');
 const amountEl_one = document.getElementById('amount-one');
 const currencyEl_two = document.getElementById('currency-two');
 const amountEl_two = document.getElementById('amount-two');

 const rateEl = document.getElementById('rate');
 const swap = document.getElementById('swap');

// fetch exhange rates and update DOM
 function calculate() {
    // console.log('ran');
    // need to get values of currency-one and currency-two elements
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    // console.log(currency_one, currency_two);

    // make actual request
    // make the currenty dyanmic using variable
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data));
        // get rate of second currency
        const rate = data.rates[currency_two];
        // console.log(rate);
        // update rate element
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        // get calculated rate
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
 }

 // EVENT LISTENERS
 currencyEl_one.addEventListener('change', calculate);
 amountEl_one.addEventListener('input', calculate);
 currencyEl_two.addEventListener('change', calculate);
 amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

 calculate();