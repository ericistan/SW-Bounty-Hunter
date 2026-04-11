# Summary

Bounty Hunting is a game that follows whack-a-mole functionality but Star Wars theme. Will be based around the Mandalorian.

Game runs as follows

- Game starts with a countdown timer. When game reaches 0 game ends.
  - Win condition - no true win condition. 'winning' is based on achieving personal best high score. Will also show max streak as the statistic and time played.
  - Lose condition - When timer runs out || when player runs out of health.
- Enemies of different variety will appear in random intervals. Certain enemies will give you more points. Will use timeout or time interval function to control appearance (timeout) or (time interval?)
  - a legend component or how-to modal will explain amount of points being rewarded.
- Penalties: good-guy characters ‘grogu’ will appear randomly. If hit, it will reduce your available time. If hit 3 times, game is over.

## MVP

![MVP inital mockup](./Assets/image/swbw-moodboard_v1.png)

- Whack-a-mole game style functionality
  - const score
  - const streak
  - const max-streak
  - const time-left
  - function enemiesAppear
  - function attack
    - if attackSuccess
    - if attackMiss

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

### character types

- stormtrooper - 1 point. Most common enemy, appears frequently. 60% chance to appear.
- commander - 2 points. Less common, appears less frequently. 20% chance to appear.
- Death trooper - 3 points. Rare, appears infrequently. 10% chance to appear.

- Grogu (penalty) - if hit, reduce health by 1. If health reaches 0, game over. 20% chance to appear after 2 consecutive hits
- Dark trooper (penalty) - if hit, lose points. 30% chance to appear after 3 consecutive hits
- The armorer (powerup) - if hit, gain extra health. 10% chance to appear after 5 consecutive hits

## Stretch Goals

- higher level enemies that requires multiple hits to eliminate.
- Leaderboards. high score stored in instance - in future store in database (localStorage)
