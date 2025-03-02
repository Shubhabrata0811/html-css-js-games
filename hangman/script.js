// const path = new URL("./assets/words.json", import.meta.url).href;
// const fetchWords = await fetch(path);
// const words = await fetchWords.json();

import words from "./assets/words.json" with { type: "json" };

const getRandomWord = (choice) => {
  const categories = {
    1: "vegetables",
    2: "fruits",
    3: "birds",
    4: "animals",
  };
  const list = words[categories[choice]];
  const randomValidIdx = Math.floor(Math.random() * 100) % list.length;
  return list[randomValidIdx];
};

const getWordProgress = (lettersArray, remainingLetters) => {
  return lettersArray
    .map((letter) => (remainingLetters.has(letter) ? "_" : letter))
    .join("");
};

const result = (chances) => {
  return chances < 1 ? "You Lost!!" : "You won!!";
};

const game = (word) => {
  const remainingLetters = new Set(word);
  let remainingChances = 5;

  while (remainingChances > 0 && remainingLetters.size > 0) {
    const guessedLetter = prompt("Enter Letter: ");
    if (remainingLetters.has(guessedLetter)) {
      remainingLetters.delete(guessedLetter);
      console.log("Correct Choice");
    } else {
      console.log("Wrong Choice");
      remainingChances--;
    }
    console.log(getWordProgress(word.split(""), remainingLetters));
  }
  return result(remainingChances);
};

function main() {
  const choice = parseInt(prompt("choose: 1/2/3/4:"));
  const word = getRandomWord(choice);
  console.log(word);
  const result = game(word);
  console.log(result);
}

main();
