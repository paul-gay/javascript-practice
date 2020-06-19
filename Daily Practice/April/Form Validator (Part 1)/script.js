/*
* pull in all DOM elements needed: form + all inputs
*/

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// FUNCTIONS
// show input error message
function showError(input, message){
    // form control div is a parent element of input in HTML
    const formControl = input.parentElement;
    // change class to error
    formControl.className = 'form-control error';
    // display error message
    const small = formControl.querySelector('small');
    // message is from the if statement below
    small.innerText = message;
}

// show input success message
function showSuccess(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check if email is valid type
/*
function isValidEmail(email) {
    // regex stack overflow
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // re.test tests if valid and returns true or false
    return re.test(String(email).toLowerCase());
}
*/
// refactored
function checkEmail(input) {
    // regex stack overflow
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if returns true -- show success message
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// create a function to avoid repeated if statements in events
// check required fields
function checkRequired(inputArr) {
    // loop through array and then perform check
    // use high-order array method
    inputArr.forEach(function(input) {
        // console.log(input.value);
        if(input.value.trim() === '') {
            // wrap input into variable
            // create getFieldName function above to make first letter of input uppercase
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// check if passwords match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else {
        showSuccess(password, password2);
    }
}

// get fieldname
function getFieldName(input) {
    // use charAt to get specific character to capitalize
    // then concatenate with input id minus the fist character
    // since charAt already got the first character
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



// EVENT LISTENER
/*
add event listener on form
e is an event parameter that we will pass into the function
preventDefault prevents from actually submitting
*/
/*
form.addEventListener('submit', function(e) {
    e.preventDefault();
    // console.log('submit');
    // add .value to username -- without it you would get the element instead
    // of the actual input
    // console.log(username.value);

    if(username.value === '') {
        // takes in to things: the element and the message
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if(email.value === '') {
        // takes in to things: the element and the message
        showError(email, 'Email is required');
    } else if(!isValidEmail(email.value)) {
        showError(email, 'Email is not valid');
    } else {
        showSuccess(email);
    }

    // takes in to things: the element and the message
        if(password.value === '') {
        showError(password, 'Password is required');
    } else {
        showSuccess(password);
    }

    // takes in to things: the element and the message
    if(password2.value === '') {
        showError(password2, 'Password is required');
    } else {
        showSuccess(password2);
    }

});
*/

/* 
* refactored events
 */
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // pass in array rather than repeating checkRequired function 4 different times
    checkRequired([username, email, password, password2]);

    // takes in input, min, and max
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);

    checkEmail(email);
    checkPasswordsMatch(password, password2);
});