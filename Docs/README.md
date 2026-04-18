# SW Bounty Hunter

## About the Game

![Game preview](/Assets/image/hero-img.jpg)
A whack-a-mole style arcade game set in the Star Wars universe. Players shoot enemy characters as they pop out of holes to earn points before time runs out or health reaches zero.

Play now here [SW Bounty Hunter](https://sw-bounty-hunter.netlify.app/).
**Win condition:** No hard win — players compete for personal best score and max streak.
**Lose conditions:** Timer reaches 0 OR health reaches 0 (from hitting Grogu).

---

## Tech Stack

- HTML
- CSS
- JavaScript

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

## Game Design

![MVP initial mockup](/Assets/image/swbw-moodboard_v1.png)

Early concept designs revolves around hunting criminals in the Star Wars universe, with a focus on the Mandalorian. The game features a dark, space-themed aesthetic to create an engaging and immersive experience.

### Building the game requires the following core features:

- Score, Streak, Max Streak, Time Left, Health display
- Player interaction: clicking holes to hit characters
- Characters: Stormtrooper, Death Trooper (point values), Hutt (time bonus), The Child (health penalty)
- Randomized character spawns and intervals
- countdown timer and game over conditions
- Start/Reset functionality

## Core Functions

### Game Lifecycle

| Function      | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `startGame()` | Sets state, shows board, starts countdown and spawn loop, plays BGM |
| `endGame()`   | Stops loops, shows game over screen, plays game over SFX            |
| `resetGame()` | Resets all state to defaults, returns to start screen               |

### Character Logic

| Function                            | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `spawnCharacter()`                  | Picks a random empty hole and spawns a random character |
| `chooseRandomHole()`                | Returns a random hole with no active character, or null |
| `chooseRandomCharacter()`           | Weighted random pick from `characterWeights`            |
| `characterAppears(hole, character)` | Injects character image into hole, sets exit timeout    |
| `characterExits(hole, img)`         | Adds exit animation class, clears hole on animationend  |

### Spawn / Countdown

| Function           | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `startSpawnLoop()` | Runs `spawnCharacter()` every 550ms via `setInterval`      |
| `startCountdown()` | Ticks `timeLeft` down every second, calls `endGame()` at 0 |

### Player Interaction

| Function                 | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `handleHoleClick(event)` | Dispatches hit/miss logic per character type   |
| `damageHealth()`         | Reduces health, checks for game over condition |

### UI Updates

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

## Credits

Unofficial fan project for educational use only. Star Wars and all related assets are © & ™ Lucasfilm Ltd. / Disney. This project is not affiliated with or endorsed by Disney or Lucasfilm. No copyright infringement intended; no commercial gain is made.

Music: ["The Mandalorian Theme (Sega Genesis Cover)" by N Copeland](https://www.youtube.com/watch?v=8Xg9qfPjHkA)
