const sliderImages = document.querySelectorAll('.slide-in');

// need to use a debounce function so that you are not constantly logging scroll events since event listener is on scroll for entire window
// this function only runs the checkSlide function every 20 seconds
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


function checkSlide(e) {
    /* loop over each image and figure out where/when it needs to be shown */
    sliderImages.forEach(sliderImage => {
        /* determine if image is on current scrolled position */
        // window.scrollY -- gives how much in window user is scrolled down at very top of browser
        // need to add window.innerHeight to get where user is scrolled at bottom of 
        // then need to subtract the height of image since want to slide in when first half of image is in view
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;

        /* get bottom of image to know when user scrolls past image to slide image out */
        // offset top tells you how far top of image is from top of window aka how far down image is
        // need to know where bottom of image is by adding height of image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;

        /* determine if image is half shown -- slide in; and if not scrolled past image */
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const notScrolledPast = window.scrollY < imageBottom;

        if(isHalfShown && notScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', debounce(checkSlide));