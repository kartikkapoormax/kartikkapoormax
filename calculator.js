document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            switch (value) {
                case 'AC':
                    clearCalculator();
                    break;
                case '+/-':
                    toggleSign();
                    break;
                case '%':
                    calculatePercentage();
                    break;
                case '=':
                    calculateResult();
                    break;
                case '÷':
                case '×':
                case '-':
                case '+':
                    setOperator(value);
                    break;
                case '.':
                    appendDecimal();
                    break;
                default:
                    appendToCurrentInput(value);
            }
        });
    });

    function clearCalculator() {
        currentInput = '';
        firstOperand = null;
        operator = '';
        input.value = '0';
    }

    function toggleSign() {
        if (currentInput) {
            currentInput = currentInput.startsWith('-') 
                ? currentInput.slice(1) 
                : '-' + currentInput;
            input.value = currentInput || '0';
        }
    }

    function calculatePercentage() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            input.value = currentInput;
        }
    }

    function setOperator(op) {
        if (currentInput) {
            if (firstOperand !== null) {
                firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
                input.value = firstOperand; // Display the result of the previous operation
            } else {
                firstOperand = parseFloat(currentInput);
            }
            operator = op;
            currentInput = ''; // Reset current input for the next number
        }
    }

    function calculateResult() {
        if (firstOperand !== null && currentInput) {
            input.value = operate(firstOperand, parseFloat(currentInput), operator);
            resetCalculator();
        }
    }

    function appendToCurrentInput(value) {
        currentInput += value;
        input.value = currentInput;
    }

    function appendDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            input.value = currentInput;
        }
    }

    function resetCalculator() {
        currentInput = '';
        firstOperand = null;
        operator = '';
    }

    function operate(a, b, operator) {
        switch (operator) {
            case '÷':
                return b === 0 ? 'Error' : a / b; // Handle division by zero
            case '×':
                return a * b;
            case '-':
                return a - b;
            case '+':
                return a + b;
            default:
                return b; // If no valid operator, return the second operand
        }
    }
});
