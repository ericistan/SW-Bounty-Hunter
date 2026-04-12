# Game Logic Plan (Simple)

This file lists the core game logic needed to build your Star Wars themed whack-a-mole game without canvas.

## 1. Core Game State

Use simple variables (or one plain object) to track game values:

- score
- streak
- maxStreak
- timeLeft
- health
- damage
- isGameRunning
- currentCharacter
- activeHoleIndex

Example idea:

- score starts at 0
- streak starts at 0
- maxStreak starts at 0
- timeLeft starts at 60
- health starts at 3

## 2. DOM Setup

Grab references to page elements using getElementById or querySelector:

- start button
- timer text
- score text
- streak text
- health text
- game status text (Ready, Running, Game Over)
- all hole elements (array-like list)

Each hole should be clickable. The character appears by toggling a class name (for example: hidden/visible or active).

## 3. Start and Reset Functions

Create two simple functions:

1. resetGameState()
2. startGame()

resetGameState() should:

- set score, streak, maxStreak, timeLeft, health, groguHits back to defaults
- clear active character from all holes
- clear timers/intervals
- update UI text

startGame() should:

- call resetGameState()
- set isGameRunning to true
- start countdown timer
- start character spawn loop

## 4. Countdown Timer

Use setInterval every 1000ms:

- reduce timeLeft by 1
- update timer text
- when timeLeft is 0, call endGame("Time up")

## 5. Character Spawn Logic

Use setInterval or setTimeout for repeated spawns:

- clear previous active hole
- pick a random hole index
- pick a random character type based on simple chance rules
- show character in that hole
- store activeHoleIndex and currentCharacter

Keep it simple at first:

- stormtrooper: common
- commander: uncommon
- deathTrooper: rare
- grogu: penalty character

You can add darkTrooper and armorer later once base gameplay works.

## 6. Random Character Selection

Create a function: chooseCharacter()

Use Math.random() with basic if/else checks. Example approach:

- 0.00 to 0.59 => stormtrooper
- 0.60 to 0.79 => commander
- 0.80 to 0.89 => deathTrooper
- 0.90 to 0.99 => grogu

Return a small object:

- name
- points (positive or negative)
- type (enemy, penalty, powerup)

## 7. Player Attack Handling

Add one click listener per hole.

When player clicks:

- if game is not running, ignore
- if clicked hole is not activeHoleIndex, treat as miss
- if clicked hole is activeHoleIndex, treat as hit

Create functions:

1. handleHit(character)
2. handleMiss()

handleHit(character) should:

- update score based on character
- update streak on enemy hit
- reset streak on penalty hit
- apply penalty effects (for grogu: health minus 1)
- update maxStreak if needed
- clear active character from board
- update UI text
- check lose conditions

handleMiss() should:

- reset streak to 0
- optionally subtract a small score value (or skip this rule for MVP)
- update UI text

## 8. Win/Lose Rules (Simple)

Create function: checkGameOver()

End game if:

- timeLeft <= 0
- health <= 0
- groguHits >= 3 (if you want this as separate rule)

Create function: endGame(reason)

endGame(reason) should:

- set isGameRunning to false
- clear all timers
- hide active character
- show final message with score and maxStreak

## 9. UI Update Helpers

Keep UI updates straightforward with small functions:

- updateScoreUI()
- updateTimerUI()
- updateStreakUI()
- updateHealthUI()
- updateStatusUI(message)

Call these after each state change so display stays in sync.

## 10. Sound Hooks (Optional Early Step)

Add simple functions you can connect later:

- playHitSound()
- playMissSound()
- playPenaltySound()
- playGameOverSound()

You can leave them empty first and implement once gameplay is stable.

## 11. Suggested Build Order

1. Set up game state variables and DOM references
2. Build startGame and resetGameState
3. Build countdown timer
4. Build spawn character logic
5. Add hole click handling
6. Add hit/miss scoring rules
7. Add end game checks
8. Add polish (sounds, better probabilities, extra character types)

## 12. Keep It Fundamental

Stay with JavaScript basics only:

- variables
- functions
- if/else
- arrays
- objects
- addEventListener
- setInterval / setTimeout
- classList add/remove
- Math.random

No canvas and no advanced patterns are required for MVP.
