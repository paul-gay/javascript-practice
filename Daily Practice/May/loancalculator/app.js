/* listen for submit */
// document.getElementById('loan-form').addEventListener('submit', calculateResults);
// need to delay calculateResults to use loaders
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // hide results by default
    document.getElementById('results').style.display = 'none';

    // show loader when calculate button is clicked
    document.getElementById('loading').style.display = 'block';

    // loader spins for 2 secs and calcualteResults after 2 seconds
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});



/* Calculate Results */
function calculateResults() {
    /* get all UI variables */
    const amountEl = document.getElementById('amount');
    const interestEl = document.getElementById('interest');
    const yearsEl = document.getElementById('years');
    const monthlyPaymentEl = document.getElementById('monthly-payment');
    const totalPaymentEl = document.getElementById('total-payment');
    const totalInterestEl = document.getElementById('total-interest');

    // parseFloat turns into a decimal
    const principal = parseFloat(amountEl.value);
    const calculatedInterest = parseFloat(interestEl.value) / 100 / 2;
    const calculatedPayments = parseFloat(yearsEl.value) * 12;

    /* Compute Monthly Payments */
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x - 1);

    // check if monthly is a finite number
    if (isFinite(monthly)) {
        monthlyPaymentEl.value = monthly.toFixed(2);
        totalPaymentEl.value = (monthly * calculatedPayments).toFixed(2);
        totalInterestEl.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // display results
        document.getElementById('results').style.display = 'block';

        // hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }

};

/* Show error function */
function showError(error) {

    // hide results
    document.getElementById('results').style.display = 'none';

    // hide loader
    document.getElementById('loading').style.display = 'none';

    const errorDiv = document.createElement('div');

    // grab elements to display error messages
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class using bootstrap classes
    errorDiv.className = 'alert alert-danger';

    // create text node and append to created div
    errorDiv.appendChild(document.createTextNode(error));

    // insert into DOM above heading
    card.insertBefore(errorDiv, heading);

    // clear error message after 3 secs
    setTimeout(clearError, 3000);
};  

/* Clear Error function */
function clearError() {
    document.querySelector('.alert').remove();
}