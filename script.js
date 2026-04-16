// ── 1. DOM References ──────────────────────────────────────
const scoreElement = document.getElementById("score");
const streakElement = document.getElementById("streak");
const maxStreakElement = document.getElementById("max-streak");
const timerElement = document.getElementById("timer");
const healthElement = document.getElementById("health");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const statusMessage = document.getElementById("status-message");
const startScreen = document.getElementById("start-screen");
const gameBoard = document.getElementById("game-board");
const gameOverScore = document.getElementById("final-score");
const gameOverMaxStreak = document.getElementById("final-max-streak");
const scoreValueElement = document.querySelector("#score p");
const streakValueElement = document.querySelector("#streak p");
const maxStreakValueElement = document.querySelector("#max-streak p");
const timerValueElement = document.querySelector("#timer p");
const healthValueElement = document.querySelector("#health p");
const holes = document.querySelectorAll(".hole");

// ── 2. Game State ──────────────────────────────────────────
let score = 0;
let timeLeft = 60;
let health = 3;
let streak = 0;
let maxStreak = 0;
let isGameRunning = false;
let spawnInterval = null;
let countdownInterval = null;

// ── 3. Game Lifecycle ──────────────────────────────────────
function startGame() {
  isGameRunning = true;
  gameBoard.style.display = "grid";
  startScreen.style.display = "none";
  resetButton.style.display = "block";
  updateStatusText();
  startCountdown();
  startSpawnLoop();
  playBackgroundMusic();
}

function endGame() {
  stopSpawnLoop();
  stopBackgroundMusic();
  clearInterval(countdownInterval);
  statusMessage.innerHTML = `<h4>Game Over!</h4>`;
  playGameOverSFX();
  showGameOverScreen();
  setTimeout(() => {
    playGameOverVoiceSFX(); // play 2s later
  }, 1000);
}

function resetGame() {
  score = 0;
  timeLeft = 60;
  health = 3;
  streak = 0;
  maxStreak = 0;
  isGameRunning = false;
  resetButton.style.display = "none";
  gameBoard.style.display = "none";
  startScreen.style.display = "grid";
  gameOverScore.innerHTML = ``;
  gameOverMaxStreak.innerHTML = ``;
  stopSpawnLoop();
  stopBackgroundMusic();
  clearInterval(countdownInterval);
  updateScore();
  updateStreak();
  updateMaxStreak();
  updateTimer();
  updateHealth();
  updateStatusText();
}

// ── 4. Character Logic ─────────────────────────────────────
function spawnCharacter() {
  const selectedHole = chooseRandomHole();
  if (!selectedHole) {
    return; // No empty holes available
  }
  const selectedCharacter = chooseRandomCharacter();
  characterAppears(selectedHole, selectedCharacter);
}

function chooseRandomHole() {
  const emptyHoles = Array.from(holes).filter((hole) => hole.innerHTML === "");
  if (emptyHoles.length === 0) {
    return null;
  }
  const randomHoleIndex = Math.floor(Math.random() * emptyHoles.length);
  return emptyHoles[randomHoleIndex];
}

// Uses weighted probabilities so each character spawns at a different rate.
// Object.entries converts the weights map to pairs, .reduce sums the total,
// then a random roll walks down the weights to pick a winner. ST 1-50, GG 51-78..etc.
function chooseRandomCharacter() {
  const entries = Object.entries(characterWeights);
  const totalWeight = entries.reduce((sum, [_, weight]) => sum + weight, 0);

  let randomNum = Math.random() * totalWeight;

  for (const [character, weight] of entries) {
    if (randomNum < weight) {
      return character;
    }
    randomNum -= weight;
  }
}

function characterAppears(hole, character) {
  hole.innerHTML = `<img src="/Assets/image/characters/${character}.png" alt="${character}" class="character" draggable="false"/>`;
  const img = hole.querySelector("img");
  const timeLimit = duration[character];
  setTimeout(() => {
    characterExits(hole, img);
  }, timeLimit);
}

function characterExits(hole, img) {
  img.classList.add("characterExit");
  img.addEventListener(
    "animationend",
    () => {
      hole.innerHTML = "";
    },
    { once: true },
  );
}

// ── 5. Player Interaction ──────────────────────────────────
function handleHoleClick(event) {
  const hole = event.currentTarget;
  const characterImg = hole.querySelector("img");

  // Missed hit
  if (!characterImg) {
    streak = 0;
    updateStreak();
    playBlasterSFX();
    return;
  }

  if (characterImg.alt === "stormtrooper") {
    score += 10;
    streak += 1;
    statusMessage.innerHTML = `<p class="text-green">Score +10</p>`;
    scoreFlashGreen();
    playBlasterSFX();
    playTrooperHitSFX();
    updateScore();
    updateStreak();
    updateMaxStreak();
    hole.innerHTML = "";
  } else if (characterImg.alt === "grogu") {
    streak = 0;
    playGroguHitSFX();
    updateStreak();
    damageHealth();
    hole.innerHTML = "";
  } else if (characterImg.alt === "hutt") {
    timeLeft += 5;
    streak += 1;
    statusMessage.innerHTML = `<p class="text-green">Time +5s</p>`;
    timerFlashGreen();
    playBlasterSFX();
    playJabbaHitSFX();
    updateTimer();
    updateStreak();
    updateMaxStreak();
    hole.innerHTML = "";
  } else if (characterImg.alt === "darktrooper") {
    score += 50;
    streak += 1;
    statusMessage.innerHTML = `<p class="text-green">Score +50</p>`;
    scoreFlashGreen();
    playBlasterSFX();
    playDarkTrooperHitSFX();
    updateScore();
    updateStreak();
    updateMaxStreak();
    hole.innerHTML = "";
  }
}

function damageHealth() {
  health -= 1;
  statusMessage.innerHTML = `<p class="text-red">You hit the child -1 health.</p>`;
  healthFlashRed();
  updateHealth();
  if (health <= 0) {
    health = 0;
    timeLeft = 0;
    updateHealth();
    isGameRunning = false;
    endGame();
  }
}

// ── 6. UI Updates ──────────────────────────────────────────
function updateScore() {
  scoreValueElement.textContent = String(score);
}

function updateStreak() {
  streakValueElement.textContent = String(streak);
}

function updateMaxStreak() {
  if (streak > maxStreak) {
    maxStreak = streak;
  }
  maxStreakValueElement.textContent = String(maxStreak);
}

function updateTimer() {
  timerValueElement.textContent = `${timeLeft}s`;
}

function updateHealth() {
  healthValueElement.textContent = String(health);
}

function updateStatusText() {
  if (isGameRunning === true) {
    statusMessage.innerHTML = "Let the hunt begin!";
  } else {
    statusMessage.innerHTML = "Greetings, Bounty Hunter...";
  }
}

function showGameOverScreen() {
  gameOverScore.innerHTML = `Final Score: ${score}`;
  gameOverMaxStreak.innerHTML = `Max Streak: ${maxStreak}`;
}

function timerFlashGreen() {
  timerValueElement.classList.add("flash-green");
  setTimeout(() => {
    timerValueElement.classList.remove("flash-green");
  }, 500);
}

function scoreFlashGreen() {
  scoreValueElement.classList.add("flash-green");
  setTimeout(() => {
    scoreValueElement.classList.remove("flash-green");
  }, 500);
}

function healthFlashRed() {
  healthValueElement.classList.add("flash-red");
  setTimeout(() => {
    healthValueElement.classList.remove("flash-red");
  }, 500);
}

function stopSpawnLoop() {
  clearInterval(spawnInterval);
  spawnInterval = null;
}

// ── 7. Event Listeners ─────────────────────────────────────
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
startButton.addEventListener("mouseover", playStartButtonHoverSFX);
startButton.addEventListener("mouseleave", stopStartButtonHoverSFX);

holes.forEach((hole) => {
  hole.addEventListener("click", handleHoleClick);
});

// Unlock hover SFX on first click — required by browser autoplay policy
document.addEventListener(
  "click",
  () => {
    startButtonHoverSFX
      .play()
      .then(() => {
        startButtonHoverSFX.pause();
        startButtonHoverSFX.currentTime = 0;
      })
      .catch(() => {});
  },
  { once: true },
);

// ── 8. Init ────────────────────────────────────────────────
resetGame();
