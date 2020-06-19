// add event listener to the menu button
// select the button
// add the event listener
const button = document.querySelector('button')

// select the body to add a class to later
const body = document.body

// to push container to right -- 
// need to push both the .offsite-container and .site-container using transform property in CSS
// to open menu -- add offsite-is-open class to body when button is clicked
// button.addEventListener('click', event => {
//     body.classList.add('offsite-is-open')
// })

// to push the containers back -- need to remove the offsite-is-open class from body
// first need to check if body has the offsite-is-open class
// if it does -- then remove it
// if it doesn't add the class
// button.addEventListener('click', event => {
//     if (body.classList.contains('offsite-is-open')) {
//       body.classList.remove('offsite-is-open')
//     } else {
//       body.classList.add('offsite-is-open')
//     }
// })

// better way than if/else statement is to just use toggle
button.addEventListener('click', event => {
    body.classList.toggle('offsite-is-open')
  })