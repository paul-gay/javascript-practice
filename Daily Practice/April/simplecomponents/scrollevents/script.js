function scrollAppear() {
    const introText = document.querySelector('.intro-text');

    /*
        Element.getBoundingClientRect() method returns the 
        size of an element and its position relative to the viewport
    */
    const introPosition = introText.getBoundingClientRect().top;
    console.log(introPosition);

    /*
    read-only innerHeight property of the Window interface returns 
    the interior height of the window in pixels, 
    including the height of the horizontal scroll bar, if present.

    The value of innerHeight is taken from the width of the window's layout viewport. 
    The width can be obtained using the innerWidth property.

    basically gives you how big your screen is
    */
    var screenPosition = window.innerHeight / 1.2;
    console.log(screenPosition);

    if(introPosition < screenPosition) {
        introText.classList.add('intro-appear');
    }
}


window.addEventListener('scroll', scrollAppear);