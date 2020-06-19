const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

// function breathAnimation() {
//     console.log("Breathe In");

//     setTimeout(() => {
//         console.log("Hold");

//         setTimeout(() => {
//             console.log("Breathe Out");
//         }, holdTime);
//     }, breatheTime);
// };

function breathAnimation() {
    text.innerText = 'Breathe In!';
    container.className = 'container grow';

    setTimeout(() => {
        text.innerText = 'Hold';

        setTimeout(() => {
            text.innerText = 'Breathe Out!';
            container.className = 'container shrink';
        }, holdTime);
    }, breatheTime);
}

// run breathAnimation every 7.5 seconds -- allows to run constantly
setInterval(breathAnimation, totalTime);