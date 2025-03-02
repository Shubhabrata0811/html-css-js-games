import { getRandomWord } from "./game.js";

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  for (let i = 65; i <= 90; i++) {
    const key = document.createElement("div");
    key.classList.add("key");
    key.textContent = String.fromCharCode(i);
    key.addEventListener("click", () => {
      console.log(key.textContent);
    });
    keyboard.appendChild(key);
  }
}

const setWord = (word) => {
  const wordDiv = document.getElementById("word-progress");
  wordDiv.textContent = word;
};

const getCategory = () => {
  const wordSetSelector = document.getElementById("word-list-selector");
  if (wordSetSelector.value === "not-selected") {
    alert("Please select a valid choice!!");
    return null;
  }
  return wordSetSelector.value;
};

const startGame = () => {
  const category = getCategory();
  if (!category) return;

  document.getElementById("word-list-selector").style.display = "none";
  document.getElementById("start").style.display = "none";

  document.getElementById("restart").style.display = "block";
  document.getElementById("word-progress").style.display = "block";

  const word = getRandomWord(category);
  console.log("Selected Word:", word);
  document.getElementById("keyboard").style.display = "flex";

  setWord("_ ".repeat(word.length).trim());
};

function main() {
  document.getElementById("start").addEventListener("click", startGame);
  createKeyboard();
}

main();
