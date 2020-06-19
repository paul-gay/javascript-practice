const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// song titles
const songs = ['hey', 'summer', 'ukulele'];

// keep track of song
// start at index of 2 since that is where ukulele is in position within array
let songIndex = 2;

// initially load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
};

// Pause Song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
};

// Prev Song
function prevSong() {
    // decrease songIndex by 1 to get previous song in array
    songIndex --;

    // if first song -- go to last song
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next Song
function nextSong() {
    // increase songIndex by 1 to get previous song in array
    songIndex ++;

    // if first song -- go to last song
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// update progress bar
function updateProgress (e) {
    const { duration, currentTime } = e.srcElement;
    // console.log(duration, currentTime);

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// set progress bar
function setProgress(e) {
    // gives width of entire bar
    const width = this.clientWidth;
    // console.log(width);

    // gives width of clicked position in progress bar
    const clickX = e.offsetX;

    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}



/* EVENT LISTENERS */
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// update song timer
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);

// go to next song when song ends
audio.addEventListener('ended', nextSong);