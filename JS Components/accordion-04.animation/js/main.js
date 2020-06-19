const accordionContainer = document.querySelector('.accordion-container')

accordionContainer.addEventListener('click', event => {
  const accordionHeader = event.target.closest('.accordion__header')

  if (accordionHeader) {
    const accordion = accordionHeader.parentElement
    const accordionContent = accordionHeader.nextElementSibling
    const accordionInner = accordionContent.children[0]

    let height

    if (accordion.classList.contains('is-open')) {
      height = 0
    } else {
      height = accordionInner.getBoundingClientRect().height
    }

    accordion.classList.toggle('is-open')
    accordionContent.style.height = height + 'px'
  }
})
