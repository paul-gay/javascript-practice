const typeWriter = function(txtEl, words, wait = 3000) {
    this.txtEl = txtEl;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDelecting = false;
}

/* type method */
typeWriter.prototype.type = function() {
    // get current index of the word
    const current = this.wordIndex % this.words.length;
    // get full text of current word
    const fullText = this.words[current];
    
    
    // check if in deleting stage or not
    if(this.isDelecting) {
        // remove character
        this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
        // add character
        this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // insert txt into element
    this.txtEl.innerHTML = `<span class="txt">${this.txt}</span>`;

    // init type speed
    let typeSpeed = 200;

    if(this.isDelecting) {
        // typeSpeed = typeSpee/2
        typeSpeed /= 2;
    };

    // check if word is complete
    if(!this.isDelecting && this.txt === fullText) {
        // makes pause at end
        typeSpeed = this.wait;
        // set isDeleting to tru
        this.isDelecting = true;
    } else if(this.isDelecting && this.txt === '') {
        this.isDelecting = false;
        // move to next word
        this.wordIndex++;
        // pause before being typing again
        typeSpeed = 300;
    }


    setTimeout(() => this.type(), typeSpeed);
};


/* type method */
// init on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtEl = document.querySelector('.txt-type');
    const words = JSON.parse(txtEl.getAttribute('data-words'));
    const wait = txtEl.getAttribute('data-wait');

    // init typewriter
    new typeWriter(txtEl, words, wait);
};
