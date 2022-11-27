import { listenToKeyboard } from "./keyBindings.js";

const JS_CONFETTI = new JSConfetti();

const SECRET_WORDS = [
  "fashion",
  "employee",
  "original",
  "shark",
  "egg",
  "star",
  "freight",
  "airplane",
  "eye",
  "lavalamp",
  "bridge",
  "highway",
  "pants",
  "dishwasher",
];

let countdown = 10;
let correctLetters = [];

const SECRET_WORD = SECRET_WORDS[getRandomInt(SECRET_WORDS.length)];
console.log(SECRET_WORD);
const SECRET_WORD_LETTERS = SECRET_WORD.split("");
const SECRET_WORD_UNIQUE_LETTERS = [...new Set(SECRET_WORD_LETTERS)].sort();

const SECRET_WORD_WRAPPER = document.getElementById("secret-word");
const LETTER_BUTTONS = document.querySelectorAll(".letter");

let ELEMENT_COUNTDOWN = document.getElementById("countdown");

SECRET_WORD_LETTERS.forEach((letter) => {
  SECRET_WORD_WRAPPER.innerHTML += `<div class="secret-letter-wrapper">\n<span class="secret-letter secret-letter-hidden">${letter.toUpperCase()}</span>\n</div>`;
});

listenToKeyboard();

LETTER_BUTTONS.forEach((button) => {
  button.addEventListener("click", (event) => {
    const CLICKED_LETTER = event.target.innerHTML.toLowerCase();

    button.disabled = true;

    if (isLetterInSecretWord(CLICKED_LETTER)) {
      console.log(CLICKED_LETTER);
      button.classList.add("correct-letter");

      correctLetters.push(CLICKED_LETTER);
      displayGuessedCorrectLetter(CLICKED_LETTER);

      if (isWinner(SECRET_WORD_UNIQUE_LETTERS, correctLetters)) {
        console.log("we have a winner!!");

        setTimeout(() => {
          JS_CONFETTI.addConfetti();
          displayWinnerMessage();
        }, 500);
      }
    } else {
      button.classList.add("wrong-letter");
      if (countdown > 0) {
        countdown -= 1;

        if (countdown === 0) {
          LETTER_BUTTONS.forEach((b) => {
            b.disabled = true;
          });
        }
      } else {
        countdown = 0;
      }
      ELEMENT_COUNTDOWN.innerHTML = `${countdown} Tries Left`;
    }
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function isLetterInSecretWord(letter) {
  return SECRET_WORD_LETTERS.includes(letter);
}

function isWinner(secretWordLetters, correctLetters) {
  console.log(secretWordLetters, correctLetters.sort());
  if (secretWordLetters.join() === correctLetters.sort().join()) {
    LETTER_BUTTONS.forEach((button) => (button.disabled = true));
    return true;
  }
  return false;
}

function displayGuessedCorrectLetter(inputLetter) {
  const LETTER_ELEMENTS = document.querySelectorAll(".secret-letter");

  LETTER_ELEMENTS.forEach((letter) => {
    if (letter.innerHTML.toLowerCase() === inputLetter) {
      letter.classList.remove("secret-letter-hidden");
    }
  });
}

const displayWinnerMessage = () => {
  const WINNER_MESSAGE = document.querySelector(".winner-message");
  const ALPHABET = document.querySelector(".alphabet");
  const COUNTDOWN = document.querySelector(".countdown");

  ALPHABET.classList.add("display-none");
  WINNER_MESSAGE.classList.remove("display-none");

  COUNTDOWN.classList.add("countdown-winner");
};

const RETRY_BUTTON = document.getElementById("retry-button");

RETRY_BUTTON.addEventListener("click", () => {
  location.reload();
});
