# Summary

Bounty Hunting is a game that follows whack-a-mole functionality but Star Wars theme. Will be based around the Mandalorian.

Game runs as follows

- Game starts with a countdown timer. When game reaches 0 game ends.
  - Win condition - no true win condition. 'winning' is based on achieving personal best high score. Will also show max streak as the statistic and time played.
  - Lose condition - When timer runs out || when player runs out of health.
- Enemies of different variety will appear in random intervals. Certain enemies will give you more points. Will use timeout or time interval function to control appearance (timeout) or (time interval?)
  - a legend component or how-to modal will explain amount of points being rewarded.
- Penalties: good-guy characters ‘grogu’ will appear randomly. If hit, it will reduce your health.

## MVP

![MVP inital mockup](./Assets/image/swbw-moodboard_v1.png)

### Core functionality

#### Game Affordances

- Score
- Streak
- Max Streak
- Time Left
- Health (3 health points total)
- Health Penalty
- Character types (stormtrooper, commander, death trooper, grogu, the armorer) | stored as object with properties for point value and penalty value
- isGameRunning | boolean to track if game is active or not
- currentCharacter | string to track which character is currently active in hole
- activeHoleIndex | number to track which hole index is currently active

##### Game Functions

###### Start and Reset functions

- resetGame() | reset game state variables, clear active characters, clear timers/intervals, and update UI text
- startGame() | call resetGame(), set isGameRunning to true, start countdown timer, and start character spawn loop
- endGame() | set isGameRunning to false, clear timers/intervals, and show game over screen with final score and max streak

###### Countdown Timer

- startCountdown() | conditionally start countdown timer if isGameRunning is true, update time left every second, and call endGame() when time runs out

###### Character Spawn Logic

- spawnCharacter() | randomly select a character and display it in an active hole
- chooseCharacter() | determine which character to spawn based on math.random()
- slideCharacterUp() | toggle class name to show character image sliding up from hole
- characterSetInterval()| for spawnCharacter() to run at random intervals between 500ms to 800ms while isGameRunning is true
- characterSetTimeout() | to hide character after a certain amount of time (300ms) if not hit by player

###### Player Interaction Logic

- handleHoleClick() | event listener for hole clicks to determine if player hit active character, update score and streak, apply penalties, and check for game over condition
- updateScore() | update score variable and UI text based on character type hit
- updateStreak() | update streak variable and UI text based on whether player hit a character or missed
- updateHealth() | update health variable and UI text based on penalties incurred from hitting penalty characters
- checkGameOver() | check if health is 0 or time is up to determine if game over condition is met and call endGame() if so | Use if statements to check conditions

###### UI Elements

- scoreUI()
- streakUI()
- maxStreakUI()
- timeLeftUI()
- healthUI()
- gameStatusUI() | update text to show Ready, Running, or Game Over based on isGameRunning state

###### Sound & Music

- playSound() | function to play sound effects based on character hit or game events (success, miss, penalty, powerup, game over)
- playMusic() | function to play background music during title screen and end game screen. Music should stop when game starts and play again when game ends.

#### HTML/DOM Elements

##### Title screen with start button

- Start button | DOM element reference
- Title text | DOM element reference
- Background image
- Music (stretch goal)

##### Pop up modal with game instructions

- Instructions text
- Start button to close modal and start game (countdown timer starts when modal closes) | DOM element reference
- Close button to close modal and return to title screen | DOM element reference

##### Dashboard with score, streak, max streak, time left, health

- Score text | DOM element reference | update score
- Streak text | DOM element reference | update score and streak
- Max Streak text | DOM element reference | update score, streak, and max streak
- Time Left text | DOM element reference | update time left
- Health text | DOM element reference | update health

##### Legend component that explains character types, points, and penalties

- Character type, imagee, and point value/penalty text

##### 9 holes for characters to appear in (3 rows of 3)

- Hole elements | DOM element reference (array-like list)
- Character image appears by toggling class name (inactive/active state). CSS slides character image up from hole when active. | DOM element reference | toggle class name
- Click event listener on each target in holes to register hits and misses | handle click events

##### Game over screen with final score and max streak. And replay button.

- Final score text | DOM element reference
- Max streak text | DOM element reference
- Replay button | DOM element reference | reset game state and return to title screen
- Return to title screen button | DOM element reference | reset game state and return to title screen

#### Game Logic

##### isGameActive = true -> start character spawn loop

- Set interval to spawn characters at random intervals (between 500ms to 1500ms)
- Randomly select a hole and character type based on probability. Use Math.random() to determine which character appears.
- Update currentCharacter variable and toggle class name to show character in hole
- Store activeHoleIndex to track which hole is currently active
- Clear previous active hole before showing new character
- If player hits active character, update score and streak based on character type, play success sound effect, and check for penalties
- If player hits penalty character (Grogu or Dark Trooper), apply health penalty or point deduction, play penalty sound effect, and check for game over condition
- If player hits powerup character (The Armorer), apply health boost, play powerup sound effect, and update health text
- Continue spawning characters until time runs out or player runs out of health, at which point call endGame() function to show game over screen and final stats.

## Design style

- Star Wars theme, specifically the Mandalorian. React bits (https://reactbits.dev/backgrounds/pixel-snow?density=0.2&speed=0.1&variant=round&depthFade=9.5&flakeSize=0.009&pixelResolution=490&brightness=2.9&farPlane=18&direction=120)
- Retro arcade game aesthetic with pixel art or simple animations
- Retro music and sound effects to enhance the gaming experience

- Sound effects
  - Attack success
  - Attack miss
  - Game over
  - Damage taken
  - Powerup earned
  - Penalty incurred
- Music ![BGM](<./Assets/Audio/music/The%20Mandalorian%20-%20Theme%20(16-bit%20SEGA%20Genesis%20Cover)%20-%20Noah%20N%20Copeland.mp3>)

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

## Stretch Goals / Future Features

| Feature                              | Notes                                                    |
| ------------------------------------ | -------------------------------------------------------- |
| The Armorer (health powerup)         | Was in original plan — never added                       |
| Commander character                  | Was in original plan — replaced by Hutt and Dark Trooper |
| Leaderboard / high score persistence | Stretch goal from planning.md — would use `localStorage` |
| Multi-hit enemies                    | Stretch goal from planning.md                            |
| Difficulty scaling                   | Spawn rate or duration could tighten over time           |
