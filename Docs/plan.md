# SW Bounty Hunter — Plan (April 2026 Update)

## ![img](https://res.cloudinary.com/dza7lstvk/image/upload/v1701300868/SW-Bounty-Hunter/Screen_Shot_2024-11-28_at_3.40.44_PM_ajyqjv.png)

## Summary

A whack-a-mole style arcade game set in the Star Wars / Mandalorian universe. Players shoot enemy characters as they pop out of holes to earn points before time runs out or health reaches zero.

**Win condition:** No hard win — players compete for personal best score and max streak.
**Lose conditions:** Timer reaches 0 OR health reaches 0 (from hitting Grogu).

---

## Build Process

Development followed a plan-first, core-loop-first approach — docs and structure were laid down before any real code was written, and the game was built outward from a working spawn loop.

**1. Planning**
Started by writing the design doc across a few commits before touching any code. Defined character types, game affordances, and function signatures upfront.

**2. Skeleton**
Generated the base HTML structure and CSS. Layout, holes, and dashboard were in place before game logic existed.

**3. Core game loop**
Got the spawn interval running and the basic game loop functional. Characters appearing and disappearing in holes.

**4. Player interaction & scoring**
Added the features that made it a game: max streak tracking, slide-up/slide-down character animations, miss detection to reset streak, music and sound effects, and DOM updates for all dashboard elements.

**5. Character expansion**
Character roster update. Added Hutt and Dark Trooper, switched the character selection logic from simple `Math.random()` if/else to the weighted probability system, and gave each character its own on-screen duration.

**6. Gameplay tuning**
Adjusted character spawn weights and difficulty settings. Multiple passes of tweaking until the game felt balanced.

**7. UI polish & theme**
Updated how-to-play copy, intro layout, applied the Mandalorian Night Owl armor brand colors, added the hologram flicker CSS effect, start button hover SFX, fixed full-screen sizing, and added the carousel to replace what was originally planned as a popup modal. Favicon added.

**8. Bug fixes**
Addressed issues that surfaced from playtesting: Dark Trooper score was wrong, `chooseRandomHole()` was passing `null` to `selectedHole` causing a console error, `stopOpeningMusic` was being called in `startGame` when it no longer existed, and leftover dead code was removed.

**9. Refactor & file organization**
Final cleanup pass. Split `script.js` into `audio.js` and `config.js`, then separated the carousel into its own `carousel.js` file. Reorganized `script.js` into clearly sectioned blocks (DOM refs, state, lifecycle, character logic, player interaction, UI updates, event listeners).

---

## File Structure

The codebase is split across focused files (not reflected in planning.md):

| File           | Purpose                                                |
| -------------- | ------------------------------------------------------ |
| `index.html`   | Markup, layout, carousel slides                        |
| `script.js`    | Core game logic, state, UI updates, event listeners    |
| `config.js`    | Spawn loop, character weights, durations, crosshair UI |
| `audio.js`     | All audio elements and playback functions              |
| `carousel.js`  | Start screen carousel (independent of game logic)      |
| `starfield.js` | Animated starfield background                          |

---

## Game State Variables

| Variable            | Type        | Description                           |
| ------------------- | ----------- | ------------------------------------- |
| `score`             | number      | Player's current score                |
| `timeLeft`          | number      | Seconds remaining (starts at 60)      |
| `health`            | number      | Player health (starts at 3)           |
| `streak`            | number      | Consecutive hits without a miss       |
| `maxStreak`         | number      | Highest streak reached this session   |
| `isGameRunning`     | boolean     | Whether the game loop is active       |
| `spawnInterval`     | interval ID | Reference to the character spawn loop |
| `countdownInterval` | interval ID | Reference to the countdown timer      |

---

## Characters

| Character    | Outcome on Hit               | Points     | Duration on screen | Spawn Weight |
| ------------ | ---------------------------- | ---------- | ------------------ | ------------ |
| Stormtrooper | Score + streak               | +10 pts    | 1300ms             | 55           |
| Dark Trooper | Score + streak               | +50 pts    | 900ms              | 15           |
| Hutt (Jabba) | Time bonus + streak          | +5 seconds | 900ms              | 10           |
| Grogu        | Health penalty, streak reset | 0 pts      | 2000ms             | 15           |

**Spawn logic:** Weighted probability via `characterWeights` object in `config.js`. Replaces the original `Math.random()` if/else approach from planning.md.

**Duration logic:** Each character has its own screen time in the `duration` object in `config.js`. Replaces the flat 300ms timeout from planning.md.

**Multiple active holes:** Multiple characters can be on screen simultaneously. planning.md assumed one active hole at a time (`activeHoleIndex`).

---

## Core Functions

### Game Lifecycle (`script.js`)

| Function      | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `startGame()` | Sets state, shows board, starts countdown and spawn loop, plays BGM |
| `endGame()`   | Stops loops, shows game over screen, plays game over SFX            |
| `resetGame()` | Resets all state to defaults, returns to start screen               |

### Character Logic (`script.js`)

| Function                            | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `spawnCharacter()`                  | Picks a random empty hole and spawns a random character |
| `chooseRandomHole()`                | Returns a random hole with no active character, or null |
| `chooseRandomCharacter()`           | Weighted random pick from `characterWeights`            |
| `characterAppears(hole, character)` | Injects character image into hole, sets exit timeout    |
| `characterExits(hole, img)`         | Adds exit animation class, clears hole on animationend  |

### Spawn / Countdown (`config.js`)

| Function           | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `startSpawnLoop()` | Runs `spawnCharacter()` every 550ms via `setInterval`      |
| `startCountdown()` | Ticks `timeLeft` down every second, calls `endGame()` at 0 |

### Player Interaction (`script.js`)

| Function                 | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `handleHoleClick(event)` | Dispatches hit/miss logic per character type   |
| `damageHealth()`         | Reduces health, checks for game over condition |

### UI Updates (`script.js`)

| Function               | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `updateScore()`        | Syncs score to DOM                                                |
| `updateStreak()`       | Syncs streak to DOM                                               |
| `updateMaxStreak()`    | Updates maxStreak if current streak exceeds it, syncs to DOM      |
| `updateTimer()`        | Syncs timeLeft to DOM                                             |
| `updateHealth()`       | Syncs health to DOM                                               |
| `updateStatusText()`   | Shows "Greetings..." or "Let the hunt begin!" based on game state |
| `showGameOverScreen()` | Writes final score and max streak to game over elements           |
| `scoreFlashGreen()`    | Flashes score element green on hit                                |
| `timerFlashGreen()`    | Flashes timer element green on time bonus                         |
| `healthFlashRed()`     | Flashes health element red on damage                              |
| `stopSpawnLoop()`      | Clears and nulls `spawnInterval`                                  |

### Audio (`audio.js`)

Individual play/stop functions per event — replaces the generic `playSound()` / `playMusic()` from planning.md:

`playBlasterSFX`, `playTrooperHitSFX`, `playGroguHitSFX`, `playDarkTrooperHitSFX`, `playJabbaHitSFX`, `playBackgroundMusic`, `stopBackgroundMusic`, `playGameOverSFX`, `playGameOverVoiceSFX`, `playStartButtonHoverSFX`, `stopStartButtonHoverSFX`

---

## HTML / DOM Structure

| Section           | Notes                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| Start screen      | Title, start button, carousel (replaces popup modal from planning.md) |
| Carousel          | Slides explaining characters and controls — handled by `carousel.js`  |
| Dashboard         | Score, streak, max streak, timer, health                              |
| Game board        | 9 holes in a 3×3 grid                                                 |
| Legend / sidebar  | Character icons with point values (static HTML)                       |
| Game over overlay | Final score, max streak, reset button                                 |
| Status message    | Live feedback text (hit feedback, game state)                         |

---

## Stretch Goals / Future Features

| Feature                              | Notes                                                    |
| ------------------------------------ | -------------------------------------------------------- |
| The Armorer (health powerup)         | Was in original plan — never added                       |
| Commander character                  | Was in original plan — replaced by Hutt and Dark Trooper |
| Leaderboard / high score persistence | Stretch goal from planning.md — would use `localStorage` |
| Multi-hit enemies                    | Stretch goal from planning.md                            |
| Difficulty scaling                   | Spawn rate or duration could tighten over time           |
