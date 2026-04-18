# SW Bounty Hunter

![Game preview](/Assets/image/hero-img.jpg)

## Disclaimer

SW Bounty Hunter is an unofficial fan-made project created for educational purposes only.

Check out the live version here: [SW Bounty Hunter](https://sw-bounty-hunter.netlify.app/).

---

## Summary

A whack-a-mole style arcade game set in the Star Wars universe. Players shoot enemy characters as they pop out of holes to earn points before time runs out or health reaches zero.

**Win condition:** No hard win — players compete for personal best score and max streak.
**Lose conditions:** Timer reaches 0 OR health reaches 0 (from hitting Grogu).

---

## Tech Stack

- HTML: structure of the game board, holes, and dashboard.
- CSS: layout, styling, animations (character slide up/down, score/timer flashes, health damage), and responsive design.
- JavaScript: game logic, state management, DOM manipulation, event handling, and audio control.

---

## Build Process

Development followed a plan-first, core-loop-first approach — docs and structure were laid down before any real code was written, and the game was built outward from a working spawn loop.

**1. Planning**
Drafted design docs and defined character types, affordances, and function signatures prior to coding.

**2. Skeleton**
Established HTML/CSS layout and dashboard architecture before implementing logic.

**3. Core game loop**
Implemented the primary game loop, managing character spawn intervals and hole states.

**4. Player interaction & scoring**
Integrated hit/miss detection, streak tracking, animations, SFX, and real-time DOM updates.

**5. Character expansion**
Expanded the roster and replaced basic randomization with a weighted probability system and unique character durations.

**6. Gameplay tuning**
Iterated on spawn weights and difficulty parameters to balance gameplay.

**7. UI polish & theme**
Applied "Mandalorian Night Owl" branding, hologram CSS effects, responsive scaling, and replaced modals with a custom carousel.

**8. Bug fixes**
Resolved scoring glitches, null pointer errors in hole selection, and cleaned up legacy audio logic.

**9. Refactor & file organization**
Modularized codebase into audio.js, config.js, and carousel.js while organizing script.js by functional blocks.

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
