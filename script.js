import ancientsData from './data/ancients.js';
import cardsDataGreen from './data/mythicCards/green/index.js';
import cardsDataBrown from './data/mythicCards/brown/index.js';
import cardsDataBlue from './data/mythicCards/blue/index.js';

const ancientsContainer = document.querySelector('.ancients-container');
const difficultyContainer = document.querySelector('.difficulty-container');
const shuffleButton = document.querySelector('.shuffle-button');
const currentState = document.querySelector('.current-state');
const decks = document.querySelector('.decks');
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last-card');
const levelOne = document.getElementById('level-one');
const levelTwo = document.getElementById('level-two');
const levelThree = document.getElementById('level-three');
const greenDot = document.querySelector('.green');
const brownDot = document.querySelector('.brown');

let cardId;
let difficulty;
let currentAncient;
let counterCard;
let currentLevel = 1;
let currentColor = 'green';

function addAncientCards() {
  ancientsData.forEach((item) => {
    const ancientCard = document.createElement('img');
    ancientCard.className = 'ancient-card';
    ancientCard.id = item.id;
    ancientCard.src = item.cardFace;
    ancientsContainer.append(ancientCard);
  });
}
addAncientCards();

ancientsContainer.addEventListener('click', getAncient);

let cardsList = ancientsContainer.childNodes;

function getAncient(event) {
  if (event.target.closest('.ancient-card')) {
    cardId = event.target.closest('.ancient-card').id;
    difficultyContainer.classList.add('open');
    cardsList.forEach((el) => {
      el.classList.remove('active');
    });
    event.target.closest('.ancient-card').classList.add('active');
  }
}

difficultyContainer.addEventListener('click', getShuffleBtn);
function getShuffleBtn(event) {
  difficulty = event.target.closest('.difficulty').id;

  if (event.target.closest('.difficulty')) {
  }
  shuffleButton.classList.add('open');
}

shuffleButton.addEventListener('click', getCurrentState);
function getCurrentState(event) {
  currentState.classList.add('open');
  decks.classList.add('open');

  currentAncient = ancientsData.find((item) => item.id == cardId);
  counterCard = currentAncient.firstStage.greenCards;
  let levelOneDots = levelOne.childNodes;
  levelOneDots.forEach((el) => {
    if (el.className === 'dot green') {
      el.innerHTML = `${currentAncient.firstStage.greenCards}`;
    }

    if (el.className === 'dot blue') {
      el.innerHTML = `${currentAncient.firstStage.blueCards}`;
    }
    if (el.className === 'dot brown') {
      el.innerHTML = `${currentAncient.firstStage.brownCards}`;
    }
  });

  let levelTwoDots = levelTwo.childNodes;
  levelTwoDots.forEach((el) => {
    if (el.className === 'dot green') {
      el.innerHTML = `${currentAncient.secondStage.greenCards}`;
    }
    if (el.className === 'dot blue') {
      el.innerHTML = `${currentAncient.secondStage.blueCards}`;
    }
    if (el.className === 'dot brown') {
      el.innerHTML = `${currentAncient.secondStage.brownCards}`;
    }
  });

  let levelThreeDots = levelThree.childNodes;
  levelThreeDots.forEach((el) => {
    if (el.className === 'dot green') {
      el.innerHTML = `${currentAncient.thirdStage.greenCards}`;
    }
    if (el.className === 'dot blue') {
      el.innerHTML = `${currentAncient.thirdStage.blueCards}`;
    }
    if (el.className === 'dot brown') {
      el.innerHTML = `${currentAncient.thirdStage.brownCards}`;
    }
  });
}

deck.addEventListener('click', showLastCard);

function showLastCard(event) {
  const lastCard = document.createElement('img');
  lastCard.className = 'last-card';
  lastCard.classList.add('open');

  if (difficulty === 'very-easy') {
    if (currentColor === 'green') {
      const currentDifficulty = cardsDataGreen.find(
        (item) => item.difficulty === 'easy',
      );
      lastCard.src = currentDifficulty.cardFace;
      counterCard--;
    }
    if (currentColor === 'brown') {
      const currentDifficulty = cardsDataBrown.find(
        (item) => item.difficulty === 'easy',
      );
      lastCard.src = currentDifficulty.cardFace;
      counterCard--;
    }
    if (currentColor === 'blue') {
      const currentDifficulty = cardsDataBlue.find(
        (item) => item.difficulty === 'easy',
      );
      lastCard.src = currentDifficulty.cardFace;
      counterCard--;
    }
  }

  let elementImg = decks.children[1];

  if (elementImg !== undefined) {
    elementImg.remove();
  }
  decks.append(lastCard);

  decreaseCounter();

  console.log(counterCard, currentColor);
  if (counterCard === 0 && currentColor === 'blue') {
    currentLevel++;
    currentColor = 'green';
    if (currentLevel === 1) {
      counterCard = currentAncient.secondStage.greenCards;
    }
    if (currentLevel === 2) {
      counterCard = currentAncient.thirdStage.greenCards;
    }
  }

  changeDotColor();
  updateCounter();
}

function decreaseCounter() {
  let levelOneDots = levelOne.childNodes;
  let levelTwoDots = levelTwo.childNodes;
  let levelThreeDots = levelThree.childNodes;
  if (currentLevel === 1) {
    if (currentColor === 'green') {
      levelOneDots.forEach((el) => {
        if (el.className === 'dot green') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
    if (currentColor === 'brown') {
      levelOneDots.forEach((el) => {
        if (el.className === 'dot brown') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
    if (currentColor === 'blue') {
      levelOneDots.forEach((el) => {
        if (el.className === 'dot blue') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
  }

  if (currentLevel === 2) {
    if (currentColor === 'green') {
      levelTwoDots.forEach((el) => {
        if (el.className === 'dot green') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
    if (currentColor === 'brown') {
      levelTwoDots.forEach((el) => {
        if (el.className === 'dot brown') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
    if (currentColor === 'blue') {
      levelTwoDots.forEach((el) => {
        if (el.className === 'dot blue') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
  }
  if (currentLevel === 3) {
    if (currentColor === 'green') {
      levelThreeDots.forEach((el) => {
        if (el.className === 'dot green') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
    if (currentColor === 'brown') {
      levelThreeDots.forEach((el) => {
        if (el.className === 'dot brown') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
    if (currentColor === 'blue') {
      levelThreeDots.forEach((el) => {
        if (el.className === 'dot blue') {
          el.innerHTML = `${counterCard}`;
        }
      });
    }
  }
}

function changeDotColor() {
  if (counterCard === 0) {
    if (currentColor === 'green') {
      currentColor = 'brown';
      return;
    }
    if (currentColor === 'brown') {
      currentColor = 'blue';
      return;
    }
  }
}

function updateCounter() {
  if (counterCard !== 0) {
    return;
  }
  if (currentLevel === 1) {
    if (currentColor === 'green') {
      counterCard = currentAncient.firstStage.greenCards;
    }
    if (currentColor === 'brown') {
      counterCard = currentAncient.firstStage.brownCards;
    }
    if (currentColor === 'blue') {
      counterCard = currentAncient.firstStage.blueCards;
    }
  }
  if (currentLevel === 2) {
    if (currentColor === 'green') {
      counterCard = currentAncient.secondStage.greenCards;
    }
    if (currentColor === 'brown') {
      counterCard = currentAncient.secondStage.brownCards;
    }
    if (currentColor === 'blue') {
      counterCard = currentAncient.secondStage.blueCards;
    }
  }
  if (currentLevel === 3) {
    if (currentColor === 'green') {
      counterCard = currentAncient.thirdStage.greenCards;
    }
    if (currentColor === 'brown') {
      counterCard = currentAncient.thirdStage.brownCards;
    }
    if (currentColor === 'blue') {
      counterCard = currentAncient.thirdStage.blueCards;
    }
  }

  // currentAncient
}
