// right button should move slide to left
// left button should move slide right

// first select the carousel and buttons -- store in variables
const carousel = document.querySelector('.carousel')
// faster to select from element rather than from entire document
const previousButton = carousel.querySelector('.previous-button')
const nextButton = carousel.querySelector('.next-button')

// when next button clicked -- show the next slide
// 1. need to know current slide first -- use 'is-selected' class
const contents = carousel.querySelector('.carousel__contents')

const dotsContainer = carousel.querySelector('.carousel__dots')
const slides = Array.from(carousel.querySelectorAll('.carousel__slide'))
const dots = Array.from(carousel.querySelectorAll('.carousel__dot'))

// position slides with JS
// the left property of second slide should be that of slide one width
// left property of third slide is width of second slide
// to get width of first slide -- use getBoundingClientRect
// cosnt rect = slides[0].getBoundingClientRect()
// to get width of property
// const slideWidth = rect.width
// console.log(slideWidth)
// shorthand version
const slideWidth = slides[0].getBoundingClientRect().width
// to position slides
// fist slide -- should be 0 px
// second -- slideWidth + px
// third -- slidewidth * 2 + px
// slides[0].style.left = slideWidth * 0 + 'px'
// slides[1].style.left = slideWidth * 1 + 'px'
// slides[2].style.left = slideWidth * 2 + 'px'
// rewrite so use index of each slide to calculate the correct left value
// use forEach loop
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px'
})

nextButton.addEventListener('click', event => {
    const currentSlide = contents.querySelector('.is-selected')
    // console.log(currentSlide)
    // to get next slide -- use nextElementSibling
    // this property returns the element immediately following the specified element, in the same tree level
    const nextSlide = currentSlide.nextElementSibling
    // console.log(nextSlide)

    // to show second slide -- set its content left property to -800px in css that need to offset
    // to show thirs slide -- set its content left to -1600px in css that need to offset
    // get each slides 'left' propety using getComputedStyle to retrieve them from css
    const destination = getComputedStyle(nextSlide).left
    // console.log(destination)

    // now use destination value to set the carousel__content left property
    // need to add a minus sign to push content left by same width
    contents.style.left = '-' + destination

    // now need to update location of is-selected class to the newly displayed slide
    // this will allow you to move to the third slide
    // remove is-selected from currentSlide
    // add is-selected to nextSlide
    currentSlide.classList.remove('is-selected')
    nextSlide.classList.add('is-selected')


    // hide previous and next buttons when not needed -- prevent user error

    // first slide should not have a previous button -- add hidden attribute to button in HTML
    // when user clicks next button and show second slide -- then they should be able to go back
    // remove hidden attribute
    previousButton.removeAttribute('hidden')

    // on last slide -- user should not be able to click next button -- hide next button
    // when user clicks on next button
    // 1. check is there is a slide after nextSlide
    // 2. if not -- then there is no nextSlide
    // 3. no nextSlide -- hide next button
    if(!nextSlide.nextElementSibling) {
        nextButton.setAttribute('hidden', true)
    }

    // update dot state when prev/next button is clicked
    // 1. when user clicks next button -- find corresponding dot using querySelector
    // 2. then find next dot with nextElementSibling
    // 3. remove and add is-selected class accordingly
    // highlight dot:
    const currentDot = dotsContainer.querySelector('.is-selected')
    const nextDot = currentDot.nextElementSibling
    currentDot.classList.remove('is-selected')
    nextDot.classList.add('is-selected')


})


// previous button
previousButton.addEventListener('click', event => {
    // first need to get the currently displayed slide
    const currentSlide = contents.querySelector('.is-selected')

    // use previousElementSibling to get the previous slide
    const previousSlide = currentSlide.previousElementSibling
    // console.log(previousSlide)

    // get left property to move with getComputedStyle
    const destination = getComputedStyle(previousSlide).left

    contents.style.left = '-' + destination

    // after changing slide -- need to update location of is-selected class
    currentSlide.classList.remove('is-selected')
    previousSlide.classList.add('is-selected')

    // need to allow users to go back to second slide by showing next button again
    // that was removed above
    nextButton.removeAttribute('hidden')

    // need to hide the previous button again on first slide since there is no previous slide
    if (!previousSlide.previousElementSibling) {
        previousButton.setAttribute('hidden', true)
    }

    // prev button
    const currentDot = dotsContainer.querySelector('.is-selected')
    const previousDot = currentDot.previousElementSibling
    currentDot.classList.remove('is-selected')
    previousDot.classList.add('is-selected')

})




/*
when user clicks a dot -- the carousel needs to show the slide that corresponds with the clicked dot
    clicked fist dot: show first slide ...
*/

// 1. get the dots 
// select all carousel__dot from carousel element
// move variable declaration to top
// const dots = Array.from(carousel.querySelectorAll('.carousel__dot'))

// need to know when dot is clicked via event listener to each dot
dots.forEach(dot => {
    dot.addEventListener('click', event => {
        let clickedDotIndex
        // console.log(dot)
        // when dot is clicked -- need to find corresponding slide
        // need to know the position of dot that was clicked
        // so if user clicks first dot (dots[0]) then dot should be same thing
        // to check that they are use strict operator ===
        /* if(dots[0] === dot) {
            console.log('clicked fist dot')
        } else {
            console.log('clicked another dot')
        }
        */
        // create a loop to loop through dots
        for(let index = 0; index < dots.length; index++) {
            if(dots[index] === dot) {
                clickedDotIndex = index
            }
        }
        // console.log(clickedDotIndex)

        // use clickedDotIndex to find corresponding slide to show
        const slideToShow = slides[clickedDotIndex]
        // console.log(slideToShow)

        // now that you know which slide to show -- get its left position with getComputedStyle
        const destination = getComputedStyle(slideToShow).left
        // console.log(destination)

        // now show the slide by changing .carousel__content left position
        contents.style.left = '-' + destination


        // now need to add and remove is-selected classes again so prev/next buttons will work
        slides.forEach(slide => { slide.classList.remove('is-selected') })
        slideToShow.classList.add('is-selected')
        // console.log(slideToShow)

        // update styled dot by removing is-selected from all other dots
        // and addinf is-selected back to clicked dot
        dots.forEach(d => { d.classList.remove('is-selected') })
        dot.classList.add('is-selected')

        // to show or hide prev or nexr buttons when dots clicked
        // if user clicks first dot -- hide prev button
        // second dot -- show both prev and next button
        // thrid dot -- show prev and hide next
        if (clickedDotIndex === 0) {
            previousButton.setAttribute('hidden', true)
            nextButton.removeAttribute('hidden')
        } else if (clickedDotIndex === dots.length - 1) {
            previousButton.removeAttribute('hidden')
            nextButton.setAttribute('hidden', true)
        } else {
            previousButton.removeAttribute('hidden')
            nextButton.removeAttribute('hidden')
        }


    })
})

