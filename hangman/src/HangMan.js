class HangMan {
  #word;
  #lettersToGuess;
  #triedLetters;
  #words;
  #chancesLeft;
  #maxChances;

  constructor(wordsLists, maxChances = 6) {
    this.#words = wordsLists;
    this.#maxChances = maxChances;
    this.#chancesLeft = maxChances;
    this.#triedLetters = new Set();
  }

  get words() {
    return this.#words;
  }

  get word() {
    return this.#word;
  }

  get lettersToGuess() {
    return this.#lettersToGuess;
  }

  get chancesLeft() {
    return this.#chancesLeft;
  }

  get triedLetters() {
    return Array.from(this.#triedLetters);
  }

  guess(letter) {
    const guessingLetter = letter.toLowerCase();
    if (this.#triedLetters.has(guessingLetter) || this.isGameOver()) return;

    this.#triedLetters.add(guessingLetter);

    if (this.#lettersToGuess.has(guessingLetter)) {
      this.#lettersToGuess.delete(guessingLetter);
      return;
    }

    this.#chancesLeft--;
  }

  currentWordStatus() {
    return Array.from(this.#word)
      .map((letter) => (this.#lettersToGuess.has(letter) ? "_" : letter))
      .join("");
  }

  isGameOver() {
    return this.#chancesLeft === 0 || this.#lettersToGuess.size === 0;
  }

  didWin() {
    return this.#lettersToGuess.size === 0 && this.#chancesLeft > 0;
  }

  setWord(category = "any") {
    const validCategories = Object.keys(words);
    if (category !== "any" && !validCategories.includes(category)) return false;

    const words = this.#words;
    const desiredWords =
      category === "any" ? Object.values(words).flat() : words[category];

    if (desiredWords.length === 0) return false;

    this.#word = HangMan.getRandomWord(desiredWords);
    this.#lettersToGuess = new Set(this.#word);
    return this.#word;
  }

  reset(category = "any") {
    this.setWord(category);
    this.#chancesLeft = this.#maxChances;
    this.#triedLetters = new Set();
  }

  static getRandomWord(words) {
    const randomValidIdx = Math.floor(Math.random() * words.length);
    return words[randomValidIdx].toLowerCase();
  }
}

export { HangMan };
