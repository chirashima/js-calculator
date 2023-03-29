//rubber ducking
    // vocalize your plans and your problems/bugs
    // add eventListeners for all buttons
    // figure out how to use the ids or classes of the keys to control what they do
    // make the keys construct a string? use a CONSTRUCTOR, object with characteristics
    // also include a true/false that you can use to control what happens after an operator
    // key is pressed
    // two variables, firstVar and secondVar, as part of the equation along with the operator
    // calculator display is the element with id calc-display

// bugs & stuff to do later
    // need to limit the amount of numbers that can be entered
    // clicking the = key repeatedly after the calculation does weird things
    // clicking any operator key after the calculation finishes does weird things
    // if you hit a number key after you press = you append more numbers on the result


// constructor object that holds all my input numbers, the operator, and a boolean
// that is used in a function that clears the display and records the second number
const calculator = {
    displayValue: '0',
    firstVar: null,
//    secondVar: null,   this isn't needed for some reason
    waitingForSecondVar: false,
    operator: null,
}

// this function is used to update the calculator display, easier to use a function for this
// because writing the updates separately got really messy
// it sets the innerText of the 'calc-display' element to the 'displayValue' property of the
// 'calculator' object
function updateCalcDisplay() {
    const display = document.getElementById('calc-display')
    display.innerText = calculator.displayValue
}

// this function does the actual math using the variables and the operator, and returns the value
function calculate(firstVar, secondVar, operator) {
    if (operator === '+') {
        return firstVar + secondVar
    }
    else if (operator === '-') {
        return firstVar - secondVar
    }
    else if (operator === '*') {
        return firstVar * secondVar
    }
    else if (operator === '/') {
        return firstVar / secondVar
    }
}

// using querySelectorAll on button in the HTML document and calling those 'buttons'
const buttons = document.querySelectorAll('button')

// this function clears the display if an operator key is pressed, and appends number values
// on the original entry if an operator key is not pressed, so you keep pressing 1 and you can get
// 1111111
// the 'waitingForSecondVar' property in the calculator object is used, it is set to true after
// an operator key is pressed (that behavior is controlled by the operators function below), and
// then gets set back to false. if it is false it lets the user enter as many numbers as they want
function inputNumber(number) {
    const {displayValue, waitingForSecondVar} = calculator
    if (waitingForSecondVar === true) {
        calculator.displayValue = number
        calculator.waitingForSecondVar = false
    }
    else {
        calculator.displayValue = displayValue === '0' ? number : displayValue + number
    }
    console.log(calculator)
}

// this function controls what happens when the decimal key is pressed, it checks to see if a decimal
// already exists in the value being displayed. if a decimal already exists, it won't let another
// decimal be entered
function inputDecimal(decimal) {
    if(!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal
    }
    console.log(calculator)
}


// need a function that controls what happens when a second operator key is pressed after the first
// if someone presses + and then presses - then the math equation should use - and not go forward with
// the original calculation
function operators(newOperator) {
    const {firstVar, displayValue, operator} = calculator
    // grabbing the value of whatever is displayed so i can store it as the first variable if an
    // operator key is clicked
    const grabTheValue = parseFloat(displayValue)
    // if the operator is not null (meaning an operator key was already clicked) and if
    // waitingForSecondVar is true, then use the new operator and ditch the old one
    if (operator != null && calculator.waitingForSecondVar === true) {
        calculator.operator = newOperator
        console.log(calculator)
        return
    }
    // if first variable is null and if there's something in the display, set the first variable
    // of the equation to what's in the display
    if (firstVar === null && grabTheValue != NaN) {
        calculator.firstVar = grabTheValue
    }
    // uses the calculate function to perform the math
    else if (operator) {
        const result = calculate(firstVar, grabTheValue, operator)
        calculator.displayValue = result
    }

    // this sets the waitingForSecondVar property of the calculator object to true, whatever is
    // then clicked is treated as the next variable
    calculator.waitingForSecondVar = true
    calculator.operator = newOperator
    console.log(calculator)
}

// needed a forEach loop to get all the keys to work, without it only the top left key did anything
buttons.forEach(function(currentButton) {
    currentButton.addEventListener('click', (event) => {
        // using event.currentTarget and setting it to a variable named 'target'
        const target = event.currentTarget
        
        // if the target is not a button, life goes on
        if (!target.matches('button')) {
            return
        }

        // if the target has a class of 'operation-button' then use the 'operators' function that
        // dictates what happens when the + - * / keys are pressed using
        // the id of the button being clicked, and update the calculator display
        if (target.classList.contains('operation-button')) {
            operators(target.id)
            updateCalcDisplay()
            return
        }

        // if the target has an id of '.' then run the inputDecimal function and then update the
        // calculator display
        if (target.id === '.') {
            inputDecimal(target.id)
            updateCalcDisplay()
            return
        }
        // this controls the reset button
        if (target.classList.contains('reset-button')) {
            calculator.displayValue = ''
            calculator.firstVar = null
            calculator.waitingForSecondVar = false
            calculator.operator = null
            updateCalcDisplay()
            return
        }
        //  this controls the equals button which has its own class and id
        if (target.id === '=') {
            // need to convert whatever is in the displayed value into a float so decimal points work
            // and so math can be done
            const inputValue = parseFloat(calculator.displayValue)
            const result = calculate(calculator.firstVar, inputValue, calculator.operator)
            // displays the result using the value stored in the 'calculator' object property
            // 'displayValue'
            calculator.displayValue = result
            console.log(calculator)
            updateCalcDisplay()
        }

        // this controls what happens when the number keys are pressed
        // i had to use the statement != '=' in order for the calculator display to stop showing
        // the = sign in the result. the = sign was being logged in calculator.displayValue
        if (target.id != '=') {
            inputNumber(target.id)
            updateCalcDisplay()
        }
    })
})



