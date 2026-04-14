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
const startScreen = document.getElementById("start-screen");
const gameBoard = document.getElementById("game-board");
const gameOverScreen = document.getElementById("game-over-screen");
const gameOverScore = document.getElementById("final-score");
const gameOverMaxStreak = document.getElementById("final-max-streak");

const holes = document.querySelectorAll(".hole");

//UI Enhancements
const targetUI = document.querySelectorAll(".hole");
const redCrosshair =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><line x1='20' y1='0' x2='20' y2='40' stroke='%2347FF22' stroke-width='4'/><line x1='0' y1='20' x2='40' y2='20' stroke='%2347FF22' stroke-width='4'/></svg>\") 20 20, crosshair";
targetUI.forEach((hole) => {
  hole.style.cursor = redCrosshair;
});

//Audio elements
const blasterSFX = new Audio("Assets/Audio/sfx/sfx-blaster.mp3");
const trooperHitSFX = new Audio("Assets/Audio/sfx/sfx-stormtrooper-hit.mp3");
const darkTrooperHitSFX = new Audio("Assets/Audio/sfx/sfx-darktrooper.mp3");
const jabbaHitSFX = new Audio("Assets/Audio/sfx/sfx-jabba.mp3");
const timeRechargeSFX = new Audio("Assets/Audio/sfx/sfx-armorer.mp3");
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

function playDarkTrooperHitSFX() {
  darkTrooperHitSFX.currentTime = 0;
  backgroundMusic.volume = 0.4;
  darkTrooperHitSFX.play();
}

function playJabbaHitSFX() {
  jabbaHitSFX.currentTime = 0;
  jabbaHitSFX.play();
}

function playTimeRechargeSFX() {
  timeRechargeSFX.currentTime = 0;
  timeRechargeSFX.play();
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
  isGameRunning = true;
  gameBoard.style.display = "grid";
  startScreen.style.display = "none";
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
  showGameOverScreen();
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
  gameBoard.style.display = "none";
  startScreen.style.display = "block";
  stopSpawnLoop();
  stopBackgroundMusic();
  clearInterval(countdownInterval);
  updateScore();
  updateTimer();
  updateHealth();
  updateStatusText();
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

function showGameOverScreen() {
  gameOverScore.innerHTML = `Final Score: ${score}`;
  gameOverMaxStreak.innerHTML = `Max Streak: ${maxStreak}`;
  gameBoard.style.display = "none";
  gameOverScreen.style.display = "block";
}

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
  }, 800);
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

// const characters = [
//   "stormtrooper",
//   "grogu",
//   // "thearmorer",
//   "hutt",
//   "darktrooper",
// ];

const characterWeights = {
  stormtrooper: 55,
  grogu: 15,
  hutt: 10,
  darktrooper: 15,
};

//read up destructiuring assignment and reduce method for arrays to understand this function better. It allows us to assign different probabilities to each character spawn, making the game more dynamic and challenging. The weights can be adjusted to make certain characters appear more or less frequently based on desired difficulty and gameplay experience.
//try out console.log with the entries and totalWeight variables to see how they work!
function chooseRandomCharacter() {
  const entries = Object.entries(characterWeights); //converts KVP to aray
  const totalWeight = entries.reduce((sum, [_, weight]) => sum + weight, 0);

  let randomNum = Math.random() * totalWeight;

  for (const [character, weight] of entries) {
    if (randomNum < weight) {
      return character; // This still returns "stormtrooper", "grogu", etc.
    }
    randomNum -= weight;
  }
}

const duration = {
  stormtrooper: 1200,
  grogu: 2000,
  hutt: 800,
  darktrooper: 1000,
};

function characterAppears(hole, character) {
  hole.innerHTML = `<img src="/Assets/image/characters/${character}.png" alt="${character}" class="character" draggable="false"/>`;
  const img = hole.querySelector("img");
  let timeLimit = duration[character];
  setTimeout(() => {
    characterExits(hole, img);
  }, timeLimit);
  //if you want diff characters to staggger differently..think of 1500 as a var.
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

// Player interaction logic
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
    // Hit on active character
    score += 10;
    streak += 1;
    playBlasterSFX();
    playTrooperHitSFX();
    updateScore();
    updateStreak();
    updateMaxStreak();
    hole.innerHTML = "";
  } else if (characterImg.alt === "grogu") {
    score += 0;
    streak = 0;
    playGroguHitSFX();
    updateStreak();
    damageHealth();
    hole.innerHTML = "";
  }
  // else if (characterImg.alt === "thearmorer") {
  //   timeLeft += 5;
  //   playTimeRechargeSFX();
  //   updateTimer();
  //   hole.innerHTML = "";
  // }
  else if (characterImg.alt === "hutt") {
    timeLeft += 5;
    streak += 1;
    playBlasterSFX();
    playJabbaHitSFX();
    updateStreak();
    updateMaxStreak();
    hole.innerHTML = "";
  } else if (characterImg.alt === "darktrooper") {
    score += 20;
    streak += 1;
    playBlasterSFX();
    playDarkTrooperHitSFX();
    updateScore();
    updateStreak();
    updateMaxStreak();
    hole.innerHTML = "";
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
