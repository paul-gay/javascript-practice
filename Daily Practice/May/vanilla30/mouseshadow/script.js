const hero = document.querySelector('.hero');
const text = document.querySelector('h1');
const walk = 100; //100px

function shadow(e) {
    /* get width and height of the thing you have hovered -- the hero */
    // const width = hero.offsetWidth;
    // const height = hero.offsetHeight;
    // use destructuring
    const { offsetWidth: width, offsetHeight: height} = hero;

    /* get information about where the user's cursor was the position on x and y axis */
    // take from event (e)
    let { offsetX: x, offsetY: y } = e;

    // need to account for if mouse is hovered over h1 
    // so if they are not the same
    if(this !== e.target) {
        // if user hovers over h1 -- add distance from left and top to it
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    /* how far shadow should exrend */
    // walk is 100 -- but need it to be between -50 and 50 not 0 -100
    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
        ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
        ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
        ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;

};

hero.addEventListener('mousemove', shadow);