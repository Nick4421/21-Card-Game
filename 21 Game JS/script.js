'use strict';

const hitBtnEl = document.querySelector('.hit');
const holdBtnEl = document.querySelector('.hold');
const resetBtnEl = document.querySelector('.reset');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const nextCardEl = document.querySelector('.nextCard');

let score = 0;
let deckCounter = 0;
let gameActive = true;

const makeDeck = function (numDecks) {
  const deck = [];
  let card = {};
  for (let d = 1; d <= numDecks; d++) {
    for (let i = 1; i <= 13; i++) {
      for (let j = 1; j <= 4; j++) {
        let suite;
        if (j === 1) suite = 'clubs';
        else if (j === 2) suite = 'diamonds';
        else if (j === 3) suite = 'hearts';
        else if (j === 4) suite = 'spades';

        let face;
        let value;
        if (i === 1) {
          face = 'ace';
          value = 1;
        }
        if (i === 2) {
          face = '2';
          value = 2;
        }
        if (i === 3) {
          face = '3';
          value = 3;
        }
        if (i === 4) {
          face = '4';
          value = 4;
        }
        if (i === 5) {
          face = '5';
          value = 5;
        }
        if (i === 6) {
          face = '6';
          value = 6;
        }
        if (i === 7) {
          face = '7';
          value = 7;
        }
        if (i === 8) {
          face = '8';
          value = 8;
        }
        if (i === 9) {
          face = '9';
          value = 9;
        }
        if (i === 10) {
          face = '10';
          value = 10;
        }
        if (i === 11) {
          face = 'jack';
          value = 10;
        }
        if (i === 12) {
          face = 'queen';
          value = 10;
        }
        if (i === 13) {
          face = 'king';
          value = 10;
        }

        card = {
          value: value,
          suite: suite,
          face: face,
        };
        deck.push(card);
      }
    }
  }
  return deck;
};

const printDeck = function (deck) {
  for (let i = 0; i < deck.length; i++) {
    console.log(deck[i].value, deck[i].suite, deck[i].face);
  }
};

const shuffleArray = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

const showCard = function (card) {
  if (card.value < 11) {
    document.querySelector(
      '.card'
    ).src = `PNG-cards-1.3/${card.face}_of_${card.suite}.png`;
  } else {
    document.querySelector(
      '.card'
    ).src = `PNG-cards-1.3/${card.face}_of_${card.suite}2.png`;
  }
};

const loseGame = function () {
  gameActive = false;
  messageEl.classList.remove('hidden');
  messageEl.textContent = 'You Lose.';
  document.querySelector('body').classList.add('lose');
};

const winGame = function () {
  gameActive = false;
  messageEl.classList.remove('hidden');
  messageEl.textContent = 'You Win!';
  document.querySelector('body').classList.add('win');
};

let gameDeck;

const init = function () {
  gameActive = true;
  gameDeck = makeDeck(1);
  shuffleArray(gameDeck);
  deckCounter = 0;
  score = 0;

  document.querySelector('body').classList.remove('win');
  document.querySelector('body').classList.remove('lose');
  messageEl.textContent = '';
  messageEl.classList.add('hidden');
  nextCardEl.classList.add('hidden');
  nextCardEl.textContent = ``;
  document.querySelector('.card').src = `PNG-cards-1.3/back_of_card.png`;
  scoreEl.textContent = score;
};

init();
let nextCard;

const nextOutput = function () {
  nextCardEl.classList.remove('hidden');
  nextCardEl.textContent = `The next card was the ${nextCard.face} of ${nextCard.suite}`;
};

// Hit Button
hitBtnEl.addEventListener('click', function () {
  if (gameActive) {
    // Change score and show card
    score += gameDeck[deckCounter].value;
    showCard(gameDeck[deckCounter]);
    deckCounter++;
    scoreEl.textContent = score;
    // Check score to see if they went over
    if (score > 21) {
      loseGame();
    }
  }
});

holdBtnEl.addEventListener('click', function () {
  if (gameActive) {
    nextCard = gameDeck[deckCounter];
    if (score + nextCard.value > 21) {
      winGame();
      nextOutput();
    } else {
      loseGame();
      nextOutput();
    }
  }
});

resetBtnEl.addEventListener('click', init);
