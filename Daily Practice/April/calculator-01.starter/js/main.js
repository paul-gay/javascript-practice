/*
5 actions user has when using calculator
    1. click a number key
    2. click an operator key (+. -. x, /)
    3. click decimal key
    4. click equal key
    5. click clear key
*/

// start by creating event listener to every key
const calculator = document.querySelector('.calculator');
const calculatorButtonsDiv = document.querySelector('.calculator__keys');

// calculatorButtonsDiv.addEventListener('click', event => {
//     if (!event.target.closest('button')) return
// });

// 5 types of keys identified using data-action custom attribute
calculatorButtonsDiv.addEventListener('click', event => {
    const button = event.target
    const { action } = button.dataset
    // when user first picks up calculator -- typically press a nubmer key
    const result = display.textContent
  
    if (action === 'number') {
    //   console.log('Pressed number')
        if (result === '0') {
            display.textContent = key;
        } else {
            display.textContent = result + key;
        }
    }
  
    if (action === 'decimal') {
      console.log('Pressed decimal')
    }
  
    if (action === 'operator') {
      console.log('Pressed operator')
    }
  
    if (action === 'equal') {
      console.log('Pressed equal')
    }
  
    if (action === 'clear') {
      console.log('Pressed clear')
    }
  })