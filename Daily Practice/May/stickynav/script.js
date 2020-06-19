const nav = document.querySelector('#main');
// get top of nav point
const topOfNav = nav.offsetTop;

function fixNav() {
    // scrollY gives amount user has scrolled
    if(window.scrollY >= topOfNav) {
        /*
        when you set position fixed -- element no longer takes up any height
        this causes content to 'jump' up since there is no longer the heigt of the nav there
        use offsetHeight to account for the lost height
         */
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
    } else {
        document.body.classList.remove('fixed-nav');
        document.body.style.paddingTop = 0;
        
    }
}

window.addEventListener('scroll', fixNav);