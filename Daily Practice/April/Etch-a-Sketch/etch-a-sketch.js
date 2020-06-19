/////// select all elements on page - canvas, shake button //////
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
// this value will never change
const MOVE_AMOUNT = 50;



//////// set up canvas for drwaing ////////////


// const width = canvas.width;
// const height = canvas.height;
// make a variable called height and width from the same properties used on our canvas //
// refactored //
// const {width} = canvas;
// const {height} = canvas;
// refactor pt 2. -- destructuring //
// took width property and put into width variable //
// and take height property and put into height property //
const { width, height } = canvas; 
// console.log(width, height);

// create random x and y starting points on canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);


ctx.lineJoin = 'round';
ctx.lineCap = 'round';
// ctx.lineWidth = 10;
ctx.lineWidth = MOVE_AMOUNT;

// add colors to path
let hue = 0;
// ctx.strokeStyle = `hsl(100, 100%, 50%)`;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath(); // starts the drawing
// ctx.moveTo(200, 200);
// ctx.lineTo(200, 200);
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();


/////// write out draw functionaltiy /////////

// use options object rather than listing out all arguments -- then pass in properties of object into function
// function draw(options) {
//     console.log(options);
// }
// refactor -- destructure options object into key variable
function draw({key}) {
    // increment hue each time draw
    hue += 10; // same as hue = hue + 10
    // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

    // gives you the button that was pressed
    console.log(key);

    // draw on canvas when keys pressed
    // start the path:
    ctx.beginPath();
    ctx.moveTo(x, y);

    // move x and y values depending on what user clicks
    // x -= 10; // shorthand for x = x - 10
    // y -= 10; // shorthand for y = y - 10
    // use variable instead of hard coding amount
    // x -= MOVE_AMOUNT;
    // y -= MOVE_AMOUNT;
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        default:
            break;
        
    }
    ctx.lineTo(x,y);
    ctx.stroke();
}


/////// write handler for keys ////////
/*
function handleKey(e) {
    // prevents page from scrolling when keys being pressed
    e.preventDefault();
    // console.log("Handling Key");
    // gives what key was pressed
    console.log(e.key);
    // only concerned with arrow keys
}
*/

// refactored
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({key: e.key});
        // console.log(e.key);
        // console.log('Handling Key');
    }
}


/////// clear of shake function ////////
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    // remove shake class after animation runs so that user can shake again
    canvas.addEventListener('animationend', function() {
        console.log("Did the Shake");
        canvas.classList.remove('shake');
        // add third argument object (get something, listen for event, do something) to add event listener 
        // once: true -- add event listener unbinds itself
        // prevents from having to manually remove animationend event listener each time
    }, { once: true }
    );
}



//////// listen for arrow keys ////////
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);