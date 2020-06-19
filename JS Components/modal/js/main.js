// to open modal that is hidden -- need to add class to body tag

// search for the button
// add event listener
// when button is clicked add modal-is-open to body tag
const modalButton = document.querySelector('.jsModalButton')

modalButton.addEventListener('click', event => {
    document.body.classList.add('modal-is-open')
})

// to close the modal -- two options
// 1. clisk the x icon
// 2. click outside the modal

// using x icon
// find the x icon
// add event listener
// when x is clicked -- remove modal-is-open class from body

const modalCloseButton = document.querySelector('.jsModalClose')

modalCloseButton.addEventListener('click', event => {
    document.body.classList.remove('modal-is-open')
})
