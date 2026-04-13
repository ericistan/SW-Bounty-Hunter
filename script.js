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
const maxStreakElement = document.getElementById("max-streak");
const timerElement = document.getElementById("timer");
const healthElement = document.getElementById("health");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const statusMessage = document.getElementById("status-message");
const holes = document.querySelectorAll(".hole");

//UI Enhancements
const targetUI = document.querySelectorAll(".hole");
const redCrosshair =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><line x1='20' y1='0' x2='20' y2='40' stroke='red' stroke-width='2'/><line x1='0' y1='20' x2='40' y2='20' stroke='red' stroke-width='2'/></svg>\") 20 20, crosshair";
targetUI.forEach((hole) => {
  hole.style.cursor = redCrosshair;
});

//Audio elements
const blasterSFX = new Audio("Assets/Audio/sfx/sfx-blaster.mp3");
const trooperHitSFX = new Audio("Assets/Audio/sfx/sfx-stormtrooper-hit.mp3");
const groguHitSFX = new Audio("Assets/Audio/sfx/sfx-bad-baby.mp3");
const gameOverSFX = new Audio("Assets/Audio/sfx/sfx-mando.mp3");
const gameOverVoiceSFX = new Audio("Assets/Audio/sfx/sfx-mando-odds.mp3");
const backgroundMusic = new Audio("Assets/Audio/music/bgm.mp3");

function playBlasterSFX() {
  blasterSFX.currentTime = 0; // Reset to start for rapid firing
  blasterSFX.play();
}

function playTrooperHitSFX() {
  trooperHitSFX.currentTime = 0;
  trooperHitSFX.play();
}

function playGroguHitSFX() {
  groguHitSFX.currentTime = 0;
  groguHitSFX.play();
}

function playBackgroundMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.4;
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function playGameOverSFX() {
  gameOverSFX.currentTime = 0;
  gameOverSFX.play();
}

function playGameOverVoiceSFX() {
  gameOverVoiceSFX.currentTime = 0;
  gameOverVoiceSFX.play();
}

// Initial Values
let score = 0;
let timeLeft = 60;
let health = 3;
let streak = 0;
let maxStreak = 0;
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
  playBackgroundMusic();
}

function endGame() {
  stopSpawnLoop();
  stopBackgroundMusic();
  clearInterval(countdownInterval);
  statusMessage.innerHTML = `Game Over! Final Score: ${score}`;
  playGameOverSFX();
  setTimeout(() => {
    playGameOverVoiceSFX(); // play 2s later
  }, 1000);
}

// Step 3: Reset puts everything back to default.
function resetGame() {
  score = 0;
  timeLeft = 60;
  health = 3;
  streak = 0;
  maxStreak = 0;
  isGameRunning = false;
  startButton.textContent = "Start Game";
  stopSpawnLoop();
  stopBackgroundMusic();
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

function updateMaxStreak() {
  if (streak > maxStreak) {
    maxStreak = streak;
    maxStreakElement.innerHTML = `Max Streak: ${maxStreak}`;
  }
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
  hole.innerHTML = `<img src="/Assets/image/characters/${character}.png" alt="${character}" class="character" draggable="false"/>`;
  const img = hole.querySelector("img");
  setTimeout(() => {
    characterExits(hole, img);
  }, 5000);
}

function characterExits(hole, img) {
  hole.classList.add("is-closing");
  img.classList.add("characterExit");

  img.addEventListener(
    "animationend",
    () => {
      hole.innerHTML = "";
    },
    { once: true },
  );
}

// Player interaction logic
function handleHoleClick(event) {
  const hole = event.currentTarget;
  const characterImg = hole.querySelector("img");
  playBlasterSFX();

  // Missed hit
  if (!characterImg) {
    streak = 0;
    updateStreak();
    return;
  }

  if (characterImg.alt === "stormtrooper") {
    // Hit on active character
    score += 10;
    streak += 1;
    playTrooperHitSFX();
    updateScore();
    updateStreak();
    updateMaxStreak();
    hole.innerHTML = ""; // Clear the hole
  } else if (characterImg.alt === "grogu") {
    score += 0;
    streak = 0;
    playGroguHitSFX();
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
