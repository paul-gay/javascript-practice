const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');


checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

let lastChecked;

function handleCheck(e) {
    // check if user is holding down shit key && user is checking item off
    let inBetween = false;
    if(e.shiftKey && this.checked) {
        // loop over each checkbox and look for first item and last item that was checked
        // create a var that is in-between two checked boxes
        checkboxes.forEach(checkbox => {
            if(checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if(inBetween) {
                checkbox.checked = true;
            }
        });
    }

    lastChecked = this;
}