function bgChange() {
    // console.log("it works");
    // console.log(this.scrollY);

    /* 
        - can use this.scrollY instead of window.scrollY 
        - b/c we attached the event listener to the window in this context
            - you don't have to specify window and can use 'this' instead
            - In a function, this refers to the global object.
    */
   // this.scrollY returns the number of pixels that the document is currently scrolled vertically 
   // innerHeight property of the Window interface returns the interior height of the window in pixels, 
   // including the height of the horizontal scroll bar, if present
    if(this.scrollY > this.innerHeight / 1.5) {
        document.body.classList.add('bg-active');
    } else {
        document.body.classList.remove('bg-active');
    }
}

// In a function, this refers to the global object.
// window is the global object -- can use 'this' in function instead of window
window.addEventListener('scroll', bgChange);