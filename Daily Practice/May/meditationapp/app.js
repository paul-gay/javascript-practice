const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video-container video');

// SOUNDS
const sounds = document.querySelectorAll('.sound-picker button');
// TIME DISPLAY
const timeDisplay = document.querySelector('.time-display');
// Get LENGTH OF CIRCLE OUTLINE
// The SVGGeometryElement.getTotalLength() method returns
// the user agent's computed value for the total length of the path in user units.
const outlineLength = outline.getTotalLength();
// console.log(outlineLength);

// duration
const timeSelect = document.querySelectorAll('.time-select button');
let defaultDuration = 600;

// ANIMATE THE CIRCLE
// https://css-tricks.com/almanac/properties/s/stroke-dashoffset/
// defines the location along an SVG path where the dash of a stroke will begin. 
// The higher the number, the further along the path the dashes will begin
// makes it look like color disappears -- at 0:00
outline.style.strokeDashoffset = outlineLength;
// https://www.notion.so/SVG-Paths-2a327fbf2f9b4c2b99af3b4e2c504bf9
// set stroke to entire length of circle -- circle fully colored aka fully played
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${Math.floor(defaultDuration % 60)}`;



// PICK DIFFERENT SOUNDS
sounds.forEach(sound => {
    sound.addEventListener('click', function(){
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    });
});

// PLAY SOUND
play.addEventListener('click', () => {
    checkPlaying(song);
});


// SELECT SOUND
timeSelect.forEach(option => {
    option.addEventListener('click', function() {
        defaultDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${Math.floor(defaultDuration % 60)}`;
    });
});



// STOP AND PLAY SOUNDS & VIDEO/UPDATE BUTTON IMAGES
// arrow function syntax: (param1, param2, paramN) => {expression}
const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = './svg/pause.svg';
    } else {
        song.pause();
        video.pause();
        play.src = './svg/play.svg';
    }
};

// ANIMATE CIRCLE AND CHECK TIME
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = defaultDuration - currentTime;
    // when elapsedTime gets to 60 -- goes back to zero
    let seconds = Math.floor(elapsedTime % 60);
    // 60 seconds / 60 is 1 minute
    let minutes = Math.floor(elapsedTime / 60);

    // ANIMATE TIME TEXT
    timeDisplay.textContent = `${minutes}:${seconds}`;

    // ANIMATE PROGRESS CIRCLE
    let progress = outlineLength - (currentTime / defaultDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // RESEST TIME ONCE SONG FINISHES
    if (currentTime >= defaultDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }
}; 

