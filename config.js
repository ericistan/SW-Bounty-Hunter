//How often characters spawn (in milliseconds). Called from startGame.
function startSpawnLoop() {
  spawnInterval = setInterval(() => {
    spawnCharacter();
  }, 450);
}

//Character spawn probabilities (weights). Higher weight means more likely to spawn.
const characterWeights = {
  stormtrooper: 60,
  grogu: 24,
  hutt: 6,
  darktrooper: 15,
};

//How long each character stays on screen (in milliseconds).
const duration = {
  stormtrooper: 750,
  grogu: 1000,
  hutt: 700,
  darktrooper: 700,
};

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

//UI Crosshair
const targetUI = document.querySelectorAll(".hole");
const crossHair =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><line x1='20' y1='0' x2='20' y2='40' stroke='%2347FF22' stroke-width='4'/><line x1='0' y1='20' x2='40' y2='20' stroke='%2347FF22' stroke-width='4'/></svg>\") 20 20, crosshair";
targetUI.forEach((hole) => {
  hole.style.cursor = crossHair;
});
