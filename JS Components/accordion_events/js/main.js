// const container = document.querySelector('.accordion-container')
// container.addEventListener('click', e => {
//   const header = e.target.closest('.accordion__header')
//   if (!header) return


// to use forEach loop -- first need to select all accordions
// convert the results from selection all accordions from nodelist to an array using Array.form
// use forEach to loop over accordions
// find each accordion's header
// add event listener to header
// const accordions = Array.from(document.querySelectorAll('.accordion'))

// accordions.forEach(accordion => {
//   // Find the accordion header
//   const accordionHeader = accordion.querySelector('.accordion__header')

//   // Add event listener to the accordion header
//   accordionHeader.addEventListener('click', event => {

//     // Toggle the is-open class
//     accordion.classList.toggle('is-open')
//   })
// })


// can reduce amount of event listeners using event delegation
// instead of adding event listener to each accordion header
// use event delegation pattern to attach event listener
// to the nearest common ancestor of all elemenmts you want to listen to
// in this case -- it is the accordion container

const accordionContainer = document.querySelector('.accordion-container')
// allows you to listen for click events anywhere inside accordion-container
// event.target will be any item user clicks on
// accordionContainer.addEventListener('click', event => {
//   console.log(event.target)
// })

// if user clicks inside accordion__header -- either show or hide accordion
// if user clicks inside accordion__content -- ignore clicks
// 1. check if accordion__header is an ancestor of event.target
// accordionContainer.addEventListener('click', event => {
//   const accordionHeader = event.target.closest('.accordion__header')
//   if (accordionHeader) {
//     console.log('From header. Close accordion!')
//   } else {
//     console.log('Not from header. Ignore.')
//   }
// })
// 2. if accordion__header is an ancestor of event.target -- add/remove
// is-open class to/from .accordion
// from HTML -- know that .accordion is parentElement of .accordion__header
accordionContainer.addEventListener('click', event => {
  const accordionHeader = event.target.closest('.accordion__header')
  if (accordionHeader) {
    const accordion = accordionHeader.parentElement
    accordion.classList.toggle('is-open')
  }
})