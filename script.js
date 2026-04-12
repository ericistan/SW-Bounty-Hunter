// Build order (beginner roadmap):
// 1) Get DOM elements and show default values.
// 2) Make Start button update visible text only.
// 3) Make Reset button restore defaults.
// 4) Add countdown timer (one feature at a time).
// 5) Add character spawn logic.
// 6) Add click scoring and health rules.

// Step 1: Grab DOM elements.
const scoreElement = document.getElementById("score");
const streakElement = document.getElementById("streak");
const timerElement = document.getElementById("timer");
const healthElement = document.getElementById("health");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const statusMessage = document.getElementById("status-message");
const holes = document.querySelectorAll(".hole");

// Initial Values
let score = 0;
let timeLeft = 60;
let health = 3;
let isGameRunning = false;
let spawnInterval = null;
let countdownInterval = null;

function startGame() {
  if (isGameRunning === true) {
    startButton.textContent = "Game Running";
    return;
  }
  isGameRunning = true;
  updateStatusText();
  startCountdown();
  startSpawnLoop();
}

function endGame() {
  stopSpawnLoop();
  clearInterval(countdownInterval);
  statusMessage.innerHTML = `Game Over! Final Score: ${score}`;
}

// Step 3: Reset puts everything back to default.
function resetGame() {
  score = 0;
  timeLeft = 60;
  health = 3;
  isGameRunning = false;
  startButton.textContent = "Start Game";
  stopSpawnLoop();
  clearInterval(countdownInterval);
  updateScore();
  updateTimer();
  updateHealth();
  updateStatusText();
}

// Step 1: Wire button clicks after functions are defined.
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

// Update UI Functions
function updateScore() {
  scoreElement.innerHTML = `Score: ${score}`;
}

function updateStreak() {
  streakElement.innerHTML = `Streak: ${streak}`;
}

function updateTimer() {
  timerElement.innerHTML = `Time Left: ${timeLeft}s`;
}

function updateHealth() {
  healthElement.innerHTML = `Health: ${health}`;
}

function updateStatusText() {
  if (isGameRunning === true) {
    statusMessage.innerHTML = "Let the bounty hunting begin!";
  } else {
    statusMessage.innerHTML = "Press Start Game to begin.";
  }
}

//Countdown timer logic (called from startGame).
function startCountdown() {
  if (isGameRunning === false) return;

  countdownInterval = setInterval(() => {
    timeLeft -= 1;

    if (timeLeft <= 0) {
      timeLeft = 0; // clamp at 0
      updateTimer();
      clearInterval(countdownInterval);
      isGameRunning = false;
      endGame();
      return;
    }

    updateTimer();
  }, 1000);
}

function startSpawnLoop() {
  spawnInterval = setInterval(() => {
    spawnCharacter();
  }, 1500);
}

function stopSpawnLoop() {
  clearInterval(spawnInterval);
  spawnInterval = null;
}

function spawnCharacter() {
  const selectedHole = chooseRandomHole();
  const selectedCharacter = chooseRandomCharacter();
  characterAppears(selectedHole, selectedCharacter);
}

function chooseRandomHole() {
  const emptyHoles = Array.from(holes).filter((hole) => hole.innerHTML === "");
  if (emptyHoles.length === 0) {
    return null; // No empty holes available
  }
  const randomHoleIndex = Math.floor(Math.random() * emptyHoles.length);
  return emptyHoles[randomHoleIndex];
}

const characters = ["stormtrooper", "grogu"];

function chooseRandomCharacter() {
  const randomCharacterIndex = Math.floor(Math.random() * characters.length);
  return characters[randomCharacterIndex];
}

function characterAppears(hole, character) {
  hole.innerHTML = `<img src="/Assets/image/characters/${character}.png" alt="${character}" class="character">`;
  setTimeout(() => {
    hole.innerHTML = ""; // Clear the hole after 5 seconds
  }, 5000);
}

// Player interaction logic
// handleHoleClick() | event listener for hole clicks to determine if player hit active character, update score and streak, apply penalties, and check for game over condition

function handleHoleClick(event) {
  const hole = event.currentTarget;
  const characterImg = hole.querySelector("img");

  if (characterImg.alt === "stormtrooper") {
    // Hit on active character
    score += 10;
    streak += 1;
    updateScore();
    updateStreak();
    hole.innerHTML = ""; // Clear the hole
  }
  if (characterImg.alt === "grogu") {
    score += 0;
    streak = 0;
    updateStreak();
    damageHealth();
    hole.innerHTML = ""; // Clear the hole
  }
}

// Attach event listeners to each hole
holes.forEach((hole) => {
  hole.addEventListener("click", handleHoleClick);
});

function damageHealth() {
  health -= 1;
  updateHealth();
  if (health <= 0) {
    health = 0;
    timeLeft = 0;
    updateHealth();
    isGameRunning = false;
    endGame();
  }
}

resetGame();
