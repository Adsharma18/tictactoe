const statusDisplay = document.querySelector('.game--status');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.game--restart');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won! 🎉`;
const drawMessage = () => `Game ended in a draw! 🤝`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.textContent = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  clickedCell.classList.add('disabled');
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = winningMessage();
    gameActive = false;
    cells.forEach(cell => cell.classList.add('disabled'));
    return;
  }

  if (!gameState.includes("")) {
    statusDisplay.textContent = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = currentPlayerTurn();
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('disabled', 'x', 'o');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
