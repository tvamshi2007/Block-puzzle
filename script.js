const GRID_SIZE = 4;
const TOTAL = GRID_SIZE * GRID_SIZE;
const boardEl = document.getElementById("board");
const resetBtn = document.getElementById("reset");
const messageEl = document.getElementById("message");

let board = [];
let emptyIndex = -1;

// Create a shuffled puzzle
function initBoard() {
  const nums = Array.from({ length: TOTAL - 1 }, (_, i) => i + 1);
  nums.push(""); // empty tile

  // Fisher–Yates shuffle
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  board = nums;
  emptyIndex = board.findIndex((v) => v === "");
  renderBoard();
}

// Render tiles to DOM
function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (!value) tile.classList.add("empty");
    tile.textContent = value;
    tile.dataset.index = index;

    if (value) {
      tile.addEventListener("click", () => handleClick(index));
    }

    boardEl.appendChild(tile);
  });
}

// Check if a tile is adjacent to empty
function canMove(index) {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;
  const eRow = Math.floor(emptyIndex / GRID_SIZE);
  const eCol = emptyIndex % GRID_SIZE;

  return Math.abs(row - eRow) + Math.abs(col - eCol) === 1;
}

function handleClick(index) {
  if (!canMove(index)) return;

  const temp = board[index];
  board[index] = board[emptyIndex];
  board[emptyIndex] = temp;
  emptyIndex = index;

  renderBoard();

  if (checkWin()) {
    messageEl.textContent = "🎉 You solved it!";
  } else {
    messageEl.textContent = "";
  }
}

// Check if tiles are in order with empty at the end
function checkWin() {
  for (let i = 0; i < TOTAL - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return board[TOTAL - 1] === "";
}

resetBtn.addEventListener("click", initBoard);

// First render
initBoard();
