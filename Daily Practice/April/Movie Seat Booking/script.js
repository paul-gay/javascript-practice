/*
* selecty DOM elements
*/
const container = document.querySelector('.container');
// grab all seats in row that are not occupied -- same as CSS
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// to get things out of localStorage and display on page
populateUI()

// movieSelect gives you the element, but we also need the value inside of it
// add '+' sign to turn from string to number
// const ticketPrice =  +movieSelect.value;
// have to use let instead of const since we are updating it
// in movie select event listener
let ticketPrice =  +movieSelect.value;
// console.log(ticketPrice);
// typeof checks data type
// console.log(typeof ticketPrice);


/* FUNTIONS */

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // creates a nodeList that shows number of selected seats
    // console.log(selectedSeats);

    // need to save selection in local storage:
    // 1. copy selected seats into an array (instead of a NodeList)
    // 2. map through array
    // 3. return new array of indexes
    // spread operator copies values from selectedSeats nodeList into array
    // map is similar to forEach but returns an array
    /*
    const seatsIndex = [...selectedSeats].map(function(seat) {
        // need to return the index of seats that are selected
        // get all seats selected from DOM above -- 
        // use spread operator to get all values of seats
        // use indexOf and pass in current seat value
        return [...seats].indexOf(seat);
    });
    console.log(seatsIndex);
    */
    // refactored
    // since only one return -- can omit return keyword 
    // and remove curly brackets
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    // console.log(seatsIndex);

    // save in local storage
    // setItem is key:value pair
    // JSON.stringify convert array into string to be able to be read by server
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));



    // get length of NodeList
    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount);
    // take count that you selected from DOM above and
    // update the innerText to selectedSeatsCount
    count.innerText = selectedSeatsCount; 
    // take total that you selected from DOM above and
    // update the innerText to selectedSeatsCount * ticket price
    total.innerText = selectedSeatsCount * ticketPrice;
}

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



/* EVENT LISTENER */

// get data from localStorage and populateUI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);

    // check to see if any seats in localStorage
    // loop through and add selected class to them in UI
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    // update innerText to match localStorage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// seat select event
// when click on a seat -- need to change the class turn blue
// container.addEventListener('click', function(e) {})
// use arrow function instead
container.addEventListener('click', e => {
    // target gives you element that was clicked on
    // don't want it to work if click on anything other than seat or if occupied
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target);
        e.target.classList.toggle('selected');
        // update selected total and count
        updateSelectedCount();
    } 
});

// movie select event
// update price if user changes movie
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;

    // save movie and price to local storage
    // console.log(e.target.selectedIndex, e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});


// initital count and total set on page load
updateSelectedCount();