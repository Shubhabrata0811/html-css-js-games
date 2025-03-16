// import wordsList from "./assets/words.json" with { type: "json" };

import { HangMan } from "./src/HangMan.js";

const fetchJSON = async (filePath) => {
  const path = new URL(filePath, import.meta.url).href;
  const response = await fetch(path);
  return response.json();
};

const createOption = (value) => {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value[0].toUpperCase() + value.slice(1);
  return option;
};

const createSvg = (id, elements) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("id", id);
  svg.setAttribute("width", "550");
  svg.setAttribute("height", "600");

  elements.forEach(({ tag, attrs }) => {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs).forEach(([key, value]) =>
      elem.setAttribute(key, value)
    );
    svg.appendChild(elem);
  });

  return svg;
};

const initialViewSetUp = (categories, SVGs) => {
  const categorySelector = document.getElementById("word-category-selector");
  const allOptions = ["any", ...categories];
  allOptions.forEach((category) => {
    categorySelector.appendChild(createOption(category));
  });

  const visualSection = document.getElementById("game-visual");
  const svg = createSvg(...Object.entries(SVGs)[0]);
  visualSection.appendChild(svg);
};

const startGame = (svgId, elements) => {
  const visualSection = document.getElementById("game-visual");
  document.getElementById("before-starting-svg").style = "display: none";
  const svg = createSvg(svgId, elements.slice(0, 5));
  visualSection.appendChild(svg);
  document.getElementById("start").style = "display: none";
};

async function main() {
  const wordsLists = await fetchJSON("./assets/words.json");
  const categories = Object.keys(wordsLists);
  const SVGs = await fetchJSON("./assets/svg.json");

  initialViewSetUp(categories, SVGs);

  const startButton = document.getElementById("start");
  startButton.addEventListener("click", () =>
    startGame(...Object.entries(SVGs)[1])
  );

  const hangMan = new HangMan(wordsLists, 6);
  window.hangMan = hangMan;
}

window.onload = main;
