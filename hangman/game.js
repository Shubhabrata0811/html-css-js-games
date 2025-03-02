
const path = new URL("./assets/words.json", import.meta.url).href;
const fetchWords = await fetch(path);
const words = await fetchWords.json();

export const getRandomWord = (choice) => {
  const list = words[choice];
  const randomValidIdx = Math.floor((Math.random() * 100) % list.length);
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
    const guessedLetter = "a";
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
  const choice = parseInt(1);
  getCategory();
  const word = getRandomWord(choice);
  console.log(word);
  const result = game(word);
  console.log(result);
}