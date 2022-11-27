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
const SECRET_WORD = SECRET_WORDS[getRandomInt(SECRET_WORDS.length)];
const SECRET_WORD_LETTERS = SECRET_WORD.split("");
const SECRET_WORD_LETTERS_UNIQUE = [...new Set(SECRET_WORD_LETTERS)].sort();

const ELEMENT_COUNTDOWN_TEXT = document.getElementById("countdown-text");
const ELEMENT_LETTER = document.querySelectorAll(".letter");
const ELEMENT_RETRY_BUTTON = document.getElementById("retry-button");
const ELEMENT_SECRET_WORD = document.getElementById("secret-word");

let countdown = 10;
let guessedCorrectLetters = [];

SECRET_WORD_LETTERS.forEach((letter) => {
  ELEMENT_SECRET_WORD.innerHTML += `<div class="secret-letter-wrapper">\n<span class="secret-letter secret-letter-hidden">${letter.toUpperCase()}</span>\n</div>`;
});

listenToKeyboard();

ELEMENT_LETTER.forEach((button) => {
  button.addEventListener("click", (event) => {
    const GUESSED_LETTER = event.target.innerHTML.toLowerCase();

    button.disabled = true;

    if (isLetterInSecretWord(GUESSED_LETTER)) {
      button.classList.add("correct-letter");
      guessedCorrectLetters.push(GUESSED_LETTER);
      displayGuessedCorrectLetter(GUESSED_LETTER);

      if (isWinner(SECRET_WORD_LETTERS_UNIQUE, guessedCorrectLetters)) {
        ELEMENT_LETTER.forEach((button) => (button.disabled = true));
        displayWinnerMessage();
      }
    } else {
      button.classList.add("wrong-letter");
      if (countdown > 0) {
        countdown -= 1;

        if (countdown === 0) {
          ELEMENT_LETTER.forEach((b) => {
            b.disabled = true;
          });
        }
      } else {
        countdown = 0;
      }
      ELEMENT_COUNTDOWN_TEXT.innerHTML = `${countdown} Tries Left`;
    }
  });
});

ELEMENT_RETRY_BUTTON.addEventListener("click", () => {
  location.reload();
});

function displayGuessedCorrectLetter(guessedLetter) {
  const ELEMENT_SECRET_LETTER = document.querySelectorAll(".secret-letter");

  ELEMENT_SECRET_LETTER.forEach((letter) => {
    if (letter.innerHTML.toLowerCase() === guessedLetter) {
      letter.classList.remove("secret-letter-hidden");
    }
  });
}

function displayWinnerMessage() {
  const ELEMENT_ALPHABET = document.querySelector(".alphabet");
  const ELEMENT_COUNTDOWN = document.querySelector(".countdown");
  const ELEMENT_WINNER_MESSAGE = document.querySelector(".winner-message");

  ELEMENT_ALPHABET.classList.add("display-none");
  ELEMENT_COUNTDOWN.classList.add("countdown-winner");
  ELEMENT_WINNER_MESSAGE.classList.remove("display-none");

  JS_CONFETTI.addConfetti();
}

function getRandomInt(upperBound) {
  return Math.floor(Math.random() * upperBound);
}

function isLetterInSecretWord(letter) {
  return SECRET_WORD_LETTERS.includes(letter);
}

function isWinner(secretWordLetters, guessedCorrectLetters) {
  if (secretWordLetters.join() === guessedCorrectLetters.sort().join()) {
    return true;
  } else {
    return false;
  }
}
