const words = [
  "ПРОГРАМУВАННЯ",
  "СТИЛІ",
  "БРАУЗЕР",
  "ІНТЕРНЕТ",
  "СЕРВЕР",
  "ТЕХНОЛОГІЯ",
  "РОЗРОБКА",
  "АЛГОРИТМ",
  "ЗМІННА",
  "ФУНКЦІЯ",
  "МАСИВ",
];

let selectedWord = "";
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const wordDisplay = document.getElementById("word-display");
const keyboardDiv = document.getElementById("keyboard");
const statusMessage = document.getElementById("status-message");
const restartBtn = document.getElementById("restart-btn");
const figureParts = document.querySelectorAll(".figure-part");

function initGame() {
  mistakes = 0;
  guessedLetters = [];
  statusMessage.innerText = "";
  statusMessage.className = "status-message";
  restartBtn.classList.add("hidden");

  figureParts.forEach((part) => (part.style.display = "none"));

  selectedWord = words[Math.floor(Math.random() * words.length)];

  createKeyboard();
  updateWordDisplay();
}

function createKeyboard() {
  keyboardDiv.innerHTML = "";
  const uaAlphabet = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ";

  for (let char of uaAlphabet) {
    const btn = document.createElement("button");
    btn.innerText = char;
    btn.addEventListener("click", () => handleGuess(char, btn));
    keyboardDiv.appendChild(btn);
  }
}

function updateWordDisplay() {
  const display = selectedWord
    .split("")
    .map((letter) => {
      return guessedLetters.includes(letter) ? letter : "_";
    })
    .join(" ");

  wordDisplay.innerText = display;

  if (!display.includes("_")) {
    endGame(true);
  }
}

function handleGuess(letter, btnElement) {
  btnElement.disabled = true;

  if (selectedWord.includes(letter)) {
    guessedLetters.push(letter);
    updateWordDisplay();
  } else {
    mistakes++;
    drawHangman(mistakes);

    if (mistakes === maxMistakes) {
      endGame(false);
    }
  }
}

function drawHangman(step) {
  if (step <= figureParts.length) {
    figureParts[step - 1].style.display = "block";
  }
}

function endGame(isWin) {
  const buttons = keyboardDiv.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  if (isWin) {
    statusMessage.innerText = "Вітаємо! Ви виграли!";
    statusMessage.classList.add("win");
  } else {
    statusMessage.innerText = `Ви програли. Слово було: ${selectedWord}`;
    statusMessage.classList.add("lose");
  }

  restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", initGame);

initGame();
