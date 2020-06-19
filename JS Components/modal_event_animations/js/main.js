// to open modal that is hidden -- need to add class to body tag

const modalButton = document.querySelector('.jsModalButton')
const modalCloseButton = document.querySelector('.jsModalClose')
const modalOverlay = document.querySelector('.modal-overlay')

// search for the button
// add event listener
// when button is clicked add modal-is-open to body tag
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

// const modalCloseButton = document.querySelector('.jsModalClose')
modalCloseButton.addEventListener('click', event => {
    document.body.classList.remove('modal-is-open')
})


// close modal when user clicks outside modal
// if user clicks outside modal -- they are clickin on the modal overlay
// to detect if user clicked outside modal aka on overlay
// add event listener to overlay
// modalOverlay.addEventListener('click', event => {
//     document.body.classList.remove('modal-is-open')
//     // console.log(event.target)
// })
// problem: modal also closes when you click inside the modal itself
// need to prevent it from closing if user clicks inside modal -- prevent user error
// when click on modal -- click event 'bubbles' upward towards the overlay
// when click event hits overlay -- triggers the event listener above -- thus closes the modal

// to prevent this -- prevent event from bubbling upwards using stopPropagation
// const modal = document.querySelector('.modal')

// modal.addEventListener('click', event => {
//   event.stopPropagation()
// })
// stopPropagation method has a flaw -- 
// prevents all events of that type from passing through
// any other click events will not work since you stopped events from bubbling upwards


// BETTER METHOD
// user can only click on three things: inside modal, modal, overlay
// every event will bubble upwards and reach the modal overlay
// but events inside modal and events on modal will reach modal first before overlay
// thus event sequence is:
// click inside modal: element -- modal -- modal overlay
// click modal: modal -- modal overlay
// click overlay: modal overlay

// can check whether or not event passes through modal -- if it does --
// know that it would not close modal if clicked
// JS does not let you directly check whether or not event passes through modal
// instead -- can check if modal is an ancestor of the event.target
// if yes -- now know event will bubble through the modal
// use closest method to check if modal is ancestor of event.target
// modalOverlay.addEventListener('click', event => {
//     if (event.target.closest('.modal')) {
//         // Do nothing
//     } else {
//         // Close modal
//         document.body.classList.remove('modal-is-open')
//     }
// })
// refactor:
modalOverlay.addEventListener('click', event => {
    if (!event.target.closest('.modal')) {
      // Close modal
      document.body.classList.remove('modal-is-open')
    }
  })