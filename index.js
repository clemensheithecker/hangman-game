let countdown = 10;
const WORDS = [
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

let guessedCorrectLetters = [];
let guessedWrongLetters = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const SECRET_WORD = WORDS[getRandomInt(WORDS.length)];

const SECRET_WORD_WRAPPER = document.getElementById("secret-word");

console.log(SECRET_WORD_WRAPPER.innerHTML);

const SECRET_WORD_LETTERS = SECRET_WORD.split("");

SECRET_WORD_LETTERS.forEach((letter) => {
  SECRET_WORD_WRAPPER.innerHTML += `<div class="secret-letter-wrapper">\n<span class="secret-letter secret-letter-hidden">${letter.toUpperCase()}</span>\n</div>`;
});

const LETTER_BUTTONS = document.querySelectorAll(".letter");

let ELEMENT_COUNTDOWN = document.getElementById("countdown");

LETTER_BUTTONS.forEach((button) => {
  button.addEventListener("click", (event) => {
    const CLICKED_LETTER = event.target.innerHTML.toLowerCase();
    console.log(event.target.innerHTML.toLowerCase());
    console.log(
      `Is in secret word? ${isLetterInSecretWord(SECRET_WORD, CLICKED_LETTER)}`
    );

    button.disabled = true;

    if (isLetterInSecretWord(SECRET_WORD, CLICKED_LETTER)) {
      button.classList.add("correct-letter");

      console.log(`Clicked letter: ${CLICKED_LETTER}`);

      functionName(CLICKED_LETTER);
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

function isLetterInSecretWord(secretWord, letter) {
  const SECRET_WORD_LETTERS = secretWord.split("");

  return SECRET_WORD_LETTERS.includes(letter);
}

function functionName(inputLetter) {
  const LETTER_ELEMENTS = document.querySelectorAll(".secret-letter");

  LETTER_ELEMENTS.forEach((letter) => {
    if (letter.innerHTML.toLowerCase() === inputLetter) {
      letter.classList.remove("secret-letter-hidden");
    }
  });
}
