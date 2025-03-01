// const path = new URL("./assets/words.json", import.meta.url).href;
// const fetchWords = await fetch(path);
// const words = await fetchWords.json();

import words from "./assets/words.json" with { type: "json" };

const getRandomElement = (array) => {
  return array[0];
}

function main () {
  const choiceTable = {
    1: "vegetables",
    2: "fruits",
    3: "birds",
    4: "animals"
  }
  const choice  = parseInt(prompt("choose: 1/2/3/4:"));

  const word = getRandomElement(words[choiceTable[choice]])
  console.log(word);
  
}

main();