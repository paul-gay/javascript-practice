const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        // get the values of each data-target attributes and store in target variable
        // Element.getAttribute( ): returns the string value of a named attribute
        // - use the '+' to turn from strings to numbers
        const target = +counter.getAttribute('data-target');
        // console.log(target);
        // console.log(typeof target);

        // grab the actuall text inside the data-target attributes
        // turn from string to number
        const count = +counter.innerText;

        // set increment amount -- slower speed = faster should increment
        const increment = target / speed;
        // console.log(increment);

        if(count < target) {
            counter.innerText = Math.ceil(count + increment);
            // run updateCount after 1 millisecond
            setTimeout(updateCount, 1);
        } else {
            count.innerText = target;
        }
    };

    updateCount();
});