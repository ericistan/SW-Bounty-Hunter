# SW Bounty Hunter

## Overview

A whack-a-mole style arcade game set in the Star Wars universe. Players shoot enemy characters as they pop out of holes to earn points before time runs out or health reaches zero.

**Win condition:** No hard win — players compete for personal best score and max streak.
**Lose conditions:** Timer reaches 0 OR health reaches 0 (from hitting Grogu).

---

## Tech Stack

- HTML
- CSS
- JavaScript

## Game Design

![MVP initial mockup](./Assets/image/swbw-moodboard_v1.png)

Early concept designs revolves around hunting criminals in the Star Wars universe, with a focus on the Mandalorian. The game features a dark, space-themed aesthetic to create an engaging and immersive experience.

### Building the game requires the following core features:

- Score, Streak, Max Streak, Time Left, Health display
- Player interaction: clicking holes to hit characters
- Characters: Stormtrooper, Death Trooper (point values), Hutt (time bonus), The Child (health penalty)
- Randomized character spawns and intervals
- countdown timer and game over conditions
- Start/Reset functionality

## Character appearance and behavior logic:

- Characters will randomly appear in one of the holes at random intervals (between 500ms to 800ms).
- Each character will stay visible for a short duration (300ms) before disappearing if not hit

```
function spawnCharacter() {
  const selectedHole = chooseRandomHole();
  if (!selectedHole) {
    return; // No empty holes available
  }
  const selectedCharacter = chooseRandomCharacter();
  characterAppears(selectedHole, selectedCharacter);
}
```

```
function chooseRandomHole() {
const emptyHoles = Array.from(holes).filter((hole) => hole.innerHTML === "");
if (emptyHoles.length === 0) {
return null;
}
const randomHoleIndex = Math.floor(Math.random() \* emptyHoles.length);
return emptyHoles[randomHoleIndex];
}
```

// Uses weighted probabilities so each character spawns at a different rate.
// Object.entries converts the weights map to pairs, reduce sums the total,
// then a random roll walks down the weights to pick a winner.

```
function chooseRandomCharacter() {
const entries = Object.entries(characterWeights);
const totalWeight = entries.reduce((sum, [_, weight]) => sum + weight, 0);
```

```
let randomNum = Math.random() \* totalWeight;
for (const [character, weight] of entries) {
if (randomNum < weight) {
return character;
}
randomNum -= weight;
}
}
```

```
Character spawn probabilities (weights). Higher weight means more likely to spawn.

const characterWeights = {
  stormtrooper: 55,
  grogu: 15,
  hutt: 10,
  darktrooper: 15,
}
```

```
function characterAppears(hole, character) {
hole.innerHTML = `<img src="/Assets/image/characters/${character}.png" alt="${character}" class="character" draggable="false"/>`;
const img = hole.querySelector("img");
const timeLimit = duration[character];
setTimeout(() => {
characterExits(hole, img);
}, timeLimit);
}
```

```
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
```
