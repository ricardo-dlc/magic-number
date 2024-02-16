let secretNumber = 0;
let attempts = 0;
let maxNumber = 3;
const maxAttempts = 2;
const playedNumbers = [];

const generateRandomNumber = () => {
    if (attempts === maxAttempts) {
        setElementText('p', 'You reached the max attempts!');
        return;
    }

    if (playedNumbers.length === maxNumber) {
        setElementText('p', 'You played all possible numbers!');
        return;
    }

    const number = Math.floor(Math.random() * maxNumber) + 1;

    if (playedNumbers.includes(number)) {
        return generateRandomNumber();
    }

    playedNumbers.push(number);
    return number;
}

const userNumberInput = document.getElementById('userNumber');
const newGameButton = document.getElementById('reiniciar');
const checkNumberButton = document.getElementById('checkNumber');

const setElementText = (selector, text) =>
    document.querySelector(selector).innerHTML = text;

const endGame = () => {
    newGameButton.removeAttribute('disabled');
    checkNumberButton.setAttribute('disabled', 'disabled');
}

let checkNumber = () => {
    let userNumber = parseInt(userNumberInput.value);

    if (attempts === maxAttempts) {
        setElementText('p', 'You reached the max attempts!');
        endGame();
        return;
    }

    if (secretNumber === userNumber) {
        setElementText('p', `You did! It took you ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}.`);
        endGame();
        return;
    }

    attempts++;

    clearInput();

    if (secretNumber < userNumber) {
        setElementText('p', 'Secret number is lower.');
    } else {
        setElementText('p', 'Secret number is greater.');
    }

}

const newGame = () => {
    attempts = 1;
    secretNumber = generateRandomNumber();

    if (secretNumber) {
        setElementText('h1', 'Guess the secret number');
        setElementText('p', `Choose a number between 1 and ${maxNumber}`);


        checkNumberButton.removeAttribute('disabled');
    }
}

const resetGame = () => {
    clearInput();
    newGame();
    newGameButton.setAttribute('disabled', 'disabled');
}

const clearInput = () => document.querySelector('#userNumber').value = '';

newGame();