# Hangman Game

[Hangman](<https://en.wikipedia.org/wiki/Hangman_(game)>) is a word guessing
game. We built this app in collaboration as part of the Web Development
traineeship program at [Ledgy](https://ledgy.com/de/).

Check out a [live demo](hangman-game-ledgy.vercel.app/) of the game.

## Features

The app displays a counter, the underlined hidden word and the letters of the
alphabet. If the guessed letter is correct it turns green and a part of the word
is revealed. If it is wrong it becomes red and the counter, initially set to ten
tries, decreases by one.

Either if the player wins or loses, has the option of restarting the game.

## Tools

We used vanilla JavaScript, HTML and CSS to build this game. We fetched the
secret words from [MC Naveen](https://github.com/mcnaveen)'s [Random Words
API](https://github.com/mcnaveen/Random-Words-API). We also utilized
[modern-normalize](https://github.com/sindresorhus/modern-normalize) for a CSS
reset.

## Getting started

1. Install app dependencies.

   ```
   npm install
   ```

2. To run the app locally, use the [Live Server VS Code
   extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
   The extension provides a development local server with a live reload feature.
