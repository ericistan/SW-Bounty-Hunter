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
const startButtonElement = document.getElementById("start-button");
const holes = document.querySelectorAll(".hole");

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

// Step 3: Reset puts everything back to default.
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

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
startButton.addEventListener("mouseover", playStartButtonHoverSFX);
startButton.addEventListener("mouseleave", stopStartButtonHoverSFX);

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

function showGameOverScreen() {
  gameOverScore.innerHTML = `Final Score: ${score}`;
  gameOverMaxStreak.innerHTML = `Max Streak: ${maxStreak}`;
}

// Update UI Functions
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
    return null; // No empty holes available
  }
  const randomHoleIndex = Math.floor(Math.random() * emptyHoles.length);
  return emptyHoles[randomHoleIndex];
}

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
    scoreFlashGreen();
    statusMessage.innerHTML = `<p class="text-green">Score +10</p>`;
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

// Attach event listeners to each hole
holes.forEach((hole) => {
  hole.addEventListener("click", handleHoleClick);
});

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
resetGame();

// Carousel
const carouselTrack = document.querySelector(".carousel-track");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselIndicator = document.querySelector(".carousel-indicator");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let currentSlide = 0;

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  carouselIndicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

carouselPrev.addEventListener("click", () => {
  currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
  updateCarousel();
});

carouselNext.addEventListener("click", () => {
  currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
  updateCarousel();
});
