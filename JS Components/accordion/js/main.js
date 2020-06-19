// const container = document.querySelector('.accordion-container')
// container.addEventListener('click', e => {
//   const header = e.target.closest('.accordion__header')
//   if (!header) return

//   const accordion = header.parentElement
//   accordion.classList.toggle('is-open')
// })


// open first accordion using click event
// const firstAccordion = document.querySelector('.accordion')
// const firstAccordionHeader = firstAccordion.querySelector('.accordion__header')

// add is-open class to accordion to open the content
// remove is-open class to remove the content
// firstAccordionHeader.addEventListener('click', event => {
//   if (firstAccordion.classList.contains('is-open')) {
//     firstAccordion.classList.remove('is-open')
//   } else {
//     firstAccordion.classList.add('is-open')
//   }
// })

// toggle method to save space
// firstAccordionHeader.addEventListener('click', event => {
//   firstAccordion.classList.toggle('is-open')
// })

// to select the others
// const accordions = document.querySelectorAll('.accordion')

// // Finds each accordion
// const firstAccordion = accordions[0]
// const secondAccordion = accordions[1]
// const thirdAccordion = accordions[2]
// const fourthAccordion = accordions[3]

// // Find header for each accordion
// const firstAccordionHeader = firstAccordion.querySelector('.accordion__header')
// const secondAccordionHeader = secondAccordion.querySelector('.accordion__header')
// const thirdAccordionHeader = thirdAccordion.querySelector('.accordion__header')
// const fourthAccordionHeader = fourthAccordion.querySelector('.accordion__header')

// // Adds event listeners to all accordion headers
// firstAccordionHeader.addEventListener('click', event => {
//   firstAccordion.classList.toggle('is-open')
// })

// secondAccordionHeader.addEventListener('click', event => {
//   secondAccordion.classList.toggle('is-open')
// })

// thirdAccordionHeader.addEventListener('click', event => {
//   thirdAccordion.classList.toggle('is-open')
// })

// fourthAccordionHeader.addEventListener('click', event => {
//   fourthAccordion.classList.toggle('is-open')
// })

// use forEach loop instead
// select an accordion
// find the header in that accordion
// add an event listener to the header you found

// to use forEach loop -- first need to select all accordions
// convert the results from selection all accordions from nodelist to an array using Array.form
// use forEach to loop over accordions
// find each accordion's header
// add event listener to header
const accordions = Array.from(document.querySelectorAll('.accordion'))

accordions.forEach(accordion => {
  // Find the accordion header
  const accordionHeader = accordion.querySelector('.accordion__header')

  // Add event listener to the accordion header
  accordionHeader.addEventListener('click', event => {

    // Toggle the is-open class
    accordion.classList.toggle('is-open')
  })
})