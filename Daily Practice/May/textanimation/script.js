const text = document.querySelector('.fancy-text');
const strText = text.textContent;
const splitText = strText.split('');

text.textContent ='';

// loop over each character in string
for(let i=0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 50);

// add class to span every 50ms
function onTick() {
    // select all spans from text -- then add character
    // add character ensures you get each individual character by index
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++;

    if(char === splitText.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
}