'use strict';

//selecting elements
const player0DOM = document.querySelector('.player--0');
const player1DOM = document.querySelector('.player--1');
const score0DOM = document.getElementById('score--0');
const score1DOM = document.getElementById('score--1');
const currentScore0DOM = document.getElementById('current--0');
const currentScore1DOM = document.getElementById('current--1');
const diceDOM = document.querySelector('.dice');
const btnNewDOM = document.querySelector('.btn--new');
const btnRollDOM = document.querySelector('.btn--roll');
const btnHoldDOM = document.querySelector('.btn--hold');
const modalDOM = document.querySelector('.modal');
const closeModalDOM = document.querySelector('.close-modal');
const overlayDOM = document.querySelector('.overlay');
const startGameDOM = document.querySelector('.btn--start');
const player1InputDOM = document.getElementById('player-1-name');
const player2InputDOM = document.getElementById('player-2-name');
const player1NameDOM = document.getElementById('name--0');
const player2NameDOM = document.getElementById('name--1');
const errorMsgDOM = document.querySelector('.error');
let scores, currentScore, activePlayer, playing, winner;

// Starting conditions
const init = function() {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0DOM.textContent = 0;
    score1DOM.textContent = 0;
    currentScore0DOM.textContent = 0;
    currentScore1DOM.textContent = 0;
    diceDOM.classList.add('hidden');
    player0DOM.classList.remove('player--winner');
    player1DOM.classList.remove('player--winner');
    player0DOM.classList.add('player--active');
    player1DOM.classList.remove('player--active');
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0DOM.classList.toggle('player--active');
    player1DOM.classList.toggle('player--active');
}

//Rolling dice functionality
btnRollDOM.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceDOM.classList.remove('hidden');
        diceDOM.src = `./img/dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

//Holding score functionality
btnHoldDOM.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 10) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceDOM.classList.add('hidden');
            winner += document.getElementById(`name--${activePlayer}`).textContent;
        } else {
            switchPlayer();
        }
    }

});
console.log(winner);

//Reseting game functionality
btnNewDOM.addEventListener('click', openModal);

//open-close modal & start game button
function openModal() {
    modalDOM.classList.remove('hidden');
    overlayDOM.classList.remove('hidden');
}

function closeModal() {
    modalDOM.classList.add('hidden');
    overlayDOM.classList.add('hidden');
    errorMsgDOM.textContent = ''
};

function startGameModal() {
    if (player1InputDOM.value && player2InputDOM.value) {
        player1NameDOM.textContent = player1InputDOM.value;
        player2NameDOM.textContent = player2InputDOM.value;
        closeModal();
        player1InputDOM.value = '';
        player2InputDOM.value = '';
    } else {
        errorMsgDOM.textContent = `Please enter player names`;
    }
    init();
};

closeModalDOM.addEventListener('click', closeModal);
startGameDOM.addEventListener('click', startGameModal);

openModal();