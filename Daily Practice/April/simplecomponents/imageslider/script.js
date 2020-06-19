const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// counter
let counter = 1;

// clientWidth property is used to find the inner width of an element.
// If the element doesnt contain any CSS or inline layout boxes, it returns zero.
// property is zero for inline elements and elements with no CSS; 
// otherwise, it's the inner width of an element in pixels. 
// It includes padding but excludes borders, margins, and vertical scrollbars (if present).
const size = carouselImages[0].clientWidth;

// equates to translateX(-1200px)
carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';


// EVENT LISTENERS
nextBtn.addEventListener('click', () => {
    // return breaks out of function -- so if counter is less than 0 it won't work
    if(counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    // console.log(counter);
});

prevBtn.addEventListener('click', () => {
    // return breaks out of function -- so if counter is less than 0 it won't work
    if(counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    // console.log(counter);

});

// reset the transition
// event happens everytime animation stops
carouselSlide.addEventListener('transitionend', () => {
    // console.log('fired');
    console.log(carouselImages[counter].id);
    if (carouselImages[counter].id === 'lastClone') {
        // stop the transition to allow you to translate it back to starting position
        carouselSlide.style.transition = "none";
        // subtract 2 b/c we have to duplicate images
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    
    if (carouselImages[counter].id === 'firstClone') {
        // stop the transition to allow you to translate it back to starting position
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    
});
