const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`Januaray 01 ${currentYear + 1} 00:00:00`);

/* set bg year */
year.innerText = currentYear + 1;

/* update countdown time */
function updateCountdown() {
    const currentTime = new Date();
    // gives time until new year in milliseconds
    const difference = newYearTime - currentTime;
    // convert milliseconds to seconds -- then minutes -- then hours -- then days
    const d = Math.floor(difference / 1000 / 60 / 60 / 24);
    const h = Math.floor(difference / 1000 / 60 / 60) % 24;
    const m = Math.floor(difference / 1000 / 60) % 60;
    const s = Math.floor(difference / 1000) % 60;
    
    /* add values to DOM */
    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
};

/* show spinner before countdown */
setTimeout(() => {
    // removes from DOM after a seconds -- removes loading the first second page loads
    loading.remove();
    countdown.style.display = 'flex';
}, 1000);

/* run every second */
setInterval(updateCountdown, 1000);
