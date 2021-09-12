class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    // clears output screen
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    //for clearing single number
    delete() {
        // extract element 0 to second to last element in the string
        // i.e. 4875, 5 would be the -1 index, so it would grab 487 which is what the delete
        // function does
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    
    // determines what will occur everytime user clicks on number to add to display
    // updates currentOperand value and appends number to it
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
      }
    
    // function that contorls what calculator will do when clicking on x operation
    // i.e. 2 + 4 will display as '2 +' as the previous operand and 4 will be current
    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    // takes value inside calculator and displays it
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    // update values in output display
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        // displays '3 + ' as previous
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else{
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// document.querySelectorAll() and querySelector gets all elements that match certain string
// i.e. grabbing all the number buttons, operations, etc. 
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// loop over number buttons to add an eventListener (invokes append and update whenever button is clicked)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
// eventListeners for all the operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
// only 1 equals button on the calculator
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
  
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
  
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})