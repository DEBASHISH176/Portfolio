document.addEventListener('DOMContentLoaded', function() {
    
    const display = document.getElementById('display');
    
    
    let firstOperand = null;
    let secondOperand = null;
    let currentOperation = null;
    let shouldResetDisplay = false;
    
    
    function updateDisplay(value) {
        display.textContent = value;
    }
    
    
    function clearCalculator() {
        firstOperand = null;
        secondOperand = null;
        currentOperation = null;
        updateDisplay('0');
        shouldResetDisplay = false;
    }
    
    
    function inputNumber(number) {
        const displayValue = display.textContent;
        
        if (displayValue === '0' || shouldResetDisplay) {
            updateDisplay(number);
            shouldResetDisplay = false;
        } else {
            updateDisplay(displayValue + number);
        }
    }
    
    
    function inputDecimal() {
        if (shouldResetDisplay) {
            updateDisplay('0.');
            shouldResetDisplay = false;
            return;
        }
        
        if (!display.textContent.includes('.')) {
            updateDisplay(display.textContent + '.');
        }
    }
    
    
    function handleOperator(operator) {
        const currentValue = parseFloat(display.textContent);
        
        
        if (currentOperation !== null && !shouldResetDisplay) {
            secondOperand = currentValue;
            const result = calculate();
            updateDisplay(result);
            firstOperand = result;
        } else {
            firstOperand = currentValue;
        }
        
        currentOperation = operator;
        shouldResetDisplay = true;
    }
    
    
    function calculate() {
        if (currentOperation === null || firstOperand === null) return parseFloat(display.textContent);
        
        const currentValue = parseFloat(display.textContent);
        secondOperand = secondOperand === null ? currentValue : secondOperand;
        
        let result;
        
        switch (currentOperation) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    return 'Error';
                }
                result = firstOperand / secondOperand;
                break;
            case '%':
                result = firstOperand % secondOperand;
                break;
            default:
                return secondOperand;
        }
        
        
        currentOperation = null;
        secondOperand = null;
        
        return Math.round(result * 1000000) / 1000000; 
    }
    
    
    function handleEquals() {
        if (currentOperation === null) return;
        
        const currentValue = parseFloat(display.textContent);
        secondOperand = currentValue;
        
        const result = calculate();
        updateDisplay(result);
        
        
        firstOperand = result;
        shouldResetDisplay = true;
    }
    
    
    function changeSign() {
        const currentValue = display.textContent;
        const value = parseFloat(currentValue);
        
        if (value !== 0) {
            updateDisplay((-value).toString());
        }
    }
    
    
    function handlePercent() {
        const currentValue = parseFloat(display.textContent);
        const percentValue = currentValue / 100;
        updateDisplay(percentValue);
    }
    

    document.querySelectorAll('.key-number').forEach(button => {
        button.addEventListener('click', () => {
            inputNumber(button.textContent);
        });
    });
    
    
    document.getElementById('decimal').addEventListener('click', inputDecimal);
    
    
    document.querySelectorAll('.key-operator').forEach(button => {
        button.addEventListener('click', () => {
            handleOperator(button.textContent);
        });
    });

    document.getElementById('equal').addEventListener('click', handleEquals);
    
    document.getElementById('clear').addEventListener('click', clearCalculator);
    
    document.getElementById('sign').addEventListener('click', changeSign);
    
    document.getElementById('percent').addEventListener('click', handlePercent);
    
    document.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9') {
            inputNumber(event.key);
        } else if (event.key === '.') {
            inputDecimal();
        } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            handleOperator(event.key);
        } else if (event.key === 'Enter' || event.key === '=') {
            handleEquals();
        } else if (event.key === 'Escape') {
            clearCalculator();
        } else if (event.key === '%') {
            handlePercent();
        }
    });
});