// Start writing JavaScript here!
const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display')
const calculatorButtonsDiv = calculator.querySelector('.calculator__keys')

calculatorButtonsDiv.addEventListener('click', event => {
  if (!event.target.closest('button')) return
  const button = event.target
  const { action, key } = button.dataset
  const { previousAction } = calculator.dataset
  const result = display.textContent

  // Release operator pressed state
  const operatorKeys = [...calculatorButtonsDiv.children]
    .filter(button => button.dataset.action === 'operator')
  operatorKeys.forEach(button => button.classList.remove('is-pressed'))

  if (action === 'number') {
    if (result === '0') {
      display.textContent = key
    } else {
      display.textContent = result + key
    }

    if (previousAction === 'operator') {
      display.textContent = key
    }
  }

  if (action === 'decimal') {
    display.textContent = result + '.'
  }

  if (action === 'operator') {
    button.classList.add('is-pressed')
    calculator.dataset.firstValue = result
    calculator.dataset.operator = button.dataset.key
  }

  if (action === 'equal') {
    const firstValue = parseFloat(calculator.dataset.firstValue)
    const operator = calculator.dataset.operator
    const secondValue = parseFloat(result)

    let newResult
    if (operator === 'plus') newResult = firstValue + secondValue
    if (operator === 'minus') newResult = firstValue - secondValue
    if (operator === 'times') newResult = firstValue * secondValue
    if (operator === 'divide') newResult = firstValue / secondValue

    display.textContent = newResult
  }

  if (action === 'clear') {
    if (button.textContent === 'AC') {
      delete calculator.dataset.firstValue
      delete calculator.dataset.operator
    }

    display.textContent = '0'
    button.textContent = 'AC'
  }

  if (action !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }

  calculator.dataset.previousAction = action
})

// Testing
// =======

// Functions
/**
 * Gets the displayed value
 */
const getDisplayValue = () => {
  return calculator.querySelector('.calculator__display').textContent
}

/**
 * Presses a calculator key
 * @param {String} key
 */
const pressKey = key => {
  document.querySelector(`[data-key="${key}"]`).click()
}

/**
 * Presses calculator keys in sequence
 * @param  {...any} keys
 */
const pressKeys = (...keys) => {
  keys.forEach(pressKey)
}

/**
 * Resets calculator
 */
const resetCalculator = _ => {
  pressKeys('clear', 'clear')
  console.assert(getDisplayValue() === '0', 'Clear calculator')
  console.assert(!calculator.dataset.firstValue, 'No first value')
  console.assert(!calculator.dataset.operator, 'No operator value')
}

/**
 * Runs a test
 * @param {Object} test
 */
const runTest = test => {
  pressKeys(...test.keys)
  console.assert(getDisplayValue() === test.result, test.message)
  resetCalculator()
}

const testClearKey = _ => {
  // Before calculation
  pressKeys('5', 'clear')
  console.assert(getDisplayValue() === '0', 'Clear before calculation')
  console.assert(calculator.querySelector('[data-key="clear"]').textContent === 'AC', 'Clear once, should show AC')
  resetCalculator()

  // After calculator
  pressKeys('5', 'times', '9', 'equal', 'clear')
  const { firstValue, operator } = calculator.dataset
  console.assert(firstValue, 'Clear once;  should have first value')
  console.assert(operator, 'Clear once;  should have operator value')
  resetCalculator()
}

// Test suites
const tests = [
  // Initial Expressions
  {
    message: 'Number key',
    keys: ['2'],
    result: '2'
  },
  {
    message: 'Number Number',
    keys: ['3', '5'],
    result: '35'
  },
  {
    message: 'Number Decimal',
    keys: ['4', 'decimal'],
    result: '4.'
  },
  {
    message: 'Number Decimal Number',
    keys: ['4', 'decimal', '5'],
    result: '4.5'
  },

  // Calculations
  {
    message: 'Addition',
    keys: ['2', 'plus', '5', 'equal'],
    result: '7'
  },
  {
    message: 'Subtraction',
    keys: ['5', 'minus', '9', 'equal'],
    result: '-4'
  },
  {
    message: 'Multiplication',
    keys: ['4', 'times', '8', 'equal'],
    result: '32'
  },
  {
    message: 'Division',
    keys: ['5', 'divide', '1', '0', 'equal'],
    result: '0.5'
  }
]

// Runs the tests
testClearKey()
tests.forEach(runTest)
