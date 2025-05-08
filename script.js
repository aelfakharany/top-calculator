let firstInput, secondInput;

let operation = 0;

const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");

const zero = document.getElementById("zero");

const clear = document.getElementById("clear");

const equals = document.getElementById("equals");

const decimal = document.getElementById("decimal");

const operators = document.querySelectorAll(".operator");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(firstInput, operation, secondInput) {
    if (operation === "add") {
        return add(firstInput, secondInput);
    }
    else if (operation === "subtract") {
        return subtract(firstInput, secondInput);
    }
    else if (operation === "multiply") {
        return multiply(firstInput, secondInput);
    }
    else if (operation === "divide") {
        return divide(firstInput, secondInput);
    }
    else {return 0;}
}

function updateDisplay(value) {
    display.textContent = value;
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    let digit = button.textContent;
    if (display.textContent === '0') {
        display.textContent = String(digit);
    } else {
        display.textContent += String(digit);
    }
});
});

zero.addEventListener('click', () => {
    if (display.textContent === '0') {
        return; // Avoid multiple leading zeros
    } else {
        display.textContent += '0';
    }
});

clear.addEventListener("click", () => {
    display.textContent = "0";
    firstInput = 0;
    secondInput = 0;
});

decimal.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        firstInput = parseFloat(display.textContent);
        
        // Set operation based on operator clicked
        if (operator.textContent === '+') {
            operation = 'add';
        } else if (operator.textContent === '-') {
            operation = 'subtract';
        } else if (operator.textContent === '×') {
            operation = 'multiply';
        } else if (operator.textContent === '÷') {
            operation = 'divide';
        }
        
        // Reset display for second input
        display.textContent = '0';
    });
});

equals.addEventListener('click', () => {
    secondInput = parseFloat(display.textContent);
    
    // Handle division by zero
    if (operation === 'divide' && secondInput === 0) {
        display.textContent = 'Yeah no';
        return;
    }
    
    // Perform calculation and update display
    const result = operate(firstInput, operation, secondInput);
    display.textContent = result;
    
    // Reset for new calculation
    firstInput = result;
    operation = 0;
});