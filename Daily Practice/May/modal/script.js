const cardButtons = document.querySelectorAll('.card button');

const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

function handleCardButtonClick(e) {
    const button = e.currentTarget;
    const card = button.closest('.card');
    console.log(card);

    // grab img src
    const imgSrc = card.querySelector('img').src;
    const desc = card.dataset.description; 
    const name = card.querySelector('h2').textContent;
    console.log(desc);

    // populate modal with new info
    modalInner.innerHTML = `
        <img width="600" height="600" src="${imgSrc.replace('200', '600')}" alt="${name}"/>
        <p>${desc}</p>
    `;

    // show modal
    modalOuter.classList.add('open');
    
};

function closeModal() {
    modalOuter.classList.remove('open');
}


cardButtons.forEach(button =>
    button.addEventListener('click', handleCardButtonClick)
);

modalOuter.addEventListener('click', function(e) {
    // console.log(e.target);
    // console.log(e.currentTarget);
    // if click on anything inside modal -- it finds modal-inner
    const isOutside = !e.target.closest('.modal-inner');

    if(isOutside) {
        closeModal();
    }
});

window.addEventListener('keydown', e => {
    // console.log(e);
    if (e.key === 'Escape') {
      closeModal();
    }
});