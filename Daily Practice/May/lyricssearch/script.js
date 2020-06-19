const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';


/* search by song or artist */

// old way to deal with promises
// function searchSongs(term) {
//     fetch(`${apiURL}/suggest/${term}`).then(res => res.json()).then(data => console.log(data));
// };
// using async-await
async function searchSongs(term) {
    // waiting for respons fron fetch call and storing it in variable
    // removes need for .then()
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    /*
    * async-await makes code more readable rather than clunky 
    * by adding multiple .then() to  fetch statement
    */

    // console.log(data);
    showData(data);
};



/* show song and artist in DOM */
function showData(data) {
    let output = '';

    // our data (response from fetch) has an array called data inside it that need to loop through
    data.data.forEach(song => {
        output += `
            <li>
                <span><strong>${song.artist.name} - ${song.title}</strong></span>
                <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
        `;
    });

    result.innerHTML = `
        <ul class="songs">
            ${output}
        </ul>
    `;
};


/* EVENT LISTENERS */
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Please enter a search term');
    } else {
        searchSongs(searchTerm);
    }

});