//  ┌──────────────┬────────────────┬────────────┬──────────────┬────────┬───────┬──────────────┐
//  │     Tier     │ Time Remaining │ Spawn Rate │ Stormtrooper │ Grogu  │ Hutt  │ Dark Trooper │
//  ├──────────────┼────────────────┼────────────┼──────────────┼────────┼───────┼──────────────┤
//  │ 1 — Warm-up  │ 60–46s         │ 1000ms     │ 1000ms       │ 1400ms │ 900ms │ 850ms        │
//  ├──────────────┼────────────────┼────────────┼──────────────┼────────┼───────┼──────────────┤
//  │ 2 — Standard │ 45–31s         │ 750ms      │ 800ms        │ 1150ms │ 700ms │ 650ms        │
//  ├──────────────┼────────────────┼────────────┼──────────────┼────────┼───────┼──────────────┤
//  │ 3 — Intense  │ 30–16s         │ 520ms      │ 580ms        │ 900ms  │ 500ms │ 470ms        │
//  ├──────────────┼────────────────┼────────────┼──────────────┼────────┼───────┼──────────────┤
//  │ 4 — Frenzy   │ 15–0s          │ 340ms      │ 420ms        │ 700ms  │ 370ms │ 350ms        │
//  └──────────────┴────────────────┴────────────┴──────────────┴────────┴───────┴──────────────┘

//  ┌──────────────┬────────────────┬──────────────┬──────────┬──────────┬──────────────┐
//  │     Tier     │ Time Remaining │ Stormtrooper │  Grogu   │   Hutt   │ Dark Trooper │
//  ├──────────────┼────────────────┼──────────────┼──────────┼──────────┼──────────────┤
//  │ 1 — Warm-up  │ 60–46s         │ 65 (65%)     │ 12 (12%) │ 13 (13%) │ 10 (10%)     │
//  ├──────────────┼────────────────┼──────────────┼──────────┼──────────┼──────────────┤
//  │ 2 — Standard │ 45–31s         │ 60 (60%)     │ 18 (18%) │ 10 (10%) │ 12 (12%)     │
//  ├──────────────┼────────────────┼──────────────┼──────────┼──────────┼──────────────┤
//  │ 3 — Intense  │ 30–16s         │ 55 (55%)     │ 23 (23%) │ 8  (8%)  │ 14 (14%)     │
//  ├──────────────┼────────────────┼──────────────┼──────────┼──────────┼──────────────┤
//  │ 4 — Frenzy   │ 15–0s          │ 48 (48%)     │ 28 (28%) │ 6  (6%)  │ 18 (18%)     │
//  └──────────────┴────────────────┴──────────────┴──────────┴──────────┴──────────────┘

//How often characters spawn (in milliseconds). Called from startGame.
function startSpawnLoop() {
  spawnInterval = setInterval(() => {
    spawnCharacter();
  }, 520);
}

//Character spawn probabilities (weights). Higher weight means more likely to spawn.
const characterWeights = {
  stormtrooper: 48,
  grogu: 28,
  hutt: 6,
  darktrooper: 18,
};

//How long each character stays on screen (in milliseconds).
const duration = {
  stormtrooper: 580,
  grogu: 900,
  hutt: 500,
  darktrooper: 470,
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
