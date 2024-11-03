let balance = 984656; 
let pin = '2024'; 
let attempts = 0;
let isLocked = false;

const display = document.getElementById('display');

const myJustitBootcampCashMachine = (action) => {
    if (isLocked) {
        alert('Your account is locked. Please contact just IT customer support.');
        return;
    }

    const enteredPin = prompt('Please enter your PIN:');
    
    if (enteredPin === null) return; 

    if (enteredPin !== pin) {
        attempts++;
        if (attempts >= 3) {
            isLocked = true;
            alert('Account locked due to too many incorrect attempts.');
            return;
        } else {
            alert(`Incorrect PIN. You have ${3 - attempts} attempts left.`);
            return;
        }
    }

    switch (action) {
        case 'checkBalance':
            alert(`Your balance is £${balance}`);
            break;
        case 'deposit':
            const depositAmount = getInputAmount();
            if (!isNaN(depositAmount) && depositAmount > 0) {
                balance += depositAmount;
                clearDisplay(); 
                alert(`Deposited £${depositAmount}. New balance: £${balance}`);
            } else {
                alert('Invalid amount.');
            }
            break;
        case 'withdraw':
            const withdrawAmount = getInputAmount();
            if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= balance) {
                balance -= withdrawAmount;
                clearDisplay(); 
                alert(`Withdrew £${withdrawAmount}. New balance: £${balance}`);
            } else {
                alert('Invalid amount or insufficient funds.');
            }
            break;
        case 'changePassword':
            const newPin = prompt('Enter new PIN:');
            if (newPin && newPin.length === 4 && !isNaN(newPin)) {
                pin = newPin;
                alert('PIN change successfully done!.');
            } else {
                alert('Invalid PIN. It must be a 4-digit number.');
            }
            break;
        case 'exit':
            alert('Thank you for choosing Just IT Cash Machine.');
            break;
        default:
            alert('Invalid action.');
    }
};

const updateDisplay = (input) => {
    display.value += input;
};

const clearDisplay = () => {
    display.value = '';
};

const getInputAmount = () => {
    const amount = parseFloat(display.value);
    clearDisplay(); 
    return amount;
};
