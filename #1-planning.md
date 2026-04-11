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

![image.png](attachment:0c66a030-d740-43c1-900d-f53a050fcb13:image.png)

- Whack-a-mole game style functionality
  - const score
  - const streak
  - const max-streak
  - const time-left
  - function enemiesAppear
  - function attack
    - if attackSuccess
    - if attackMiss

### character types

- stormtrooper - 1 point
- commander - 2 points
- dark trooper - 3 points

- Grogu (penalty) - if hit, reduce health by 1. If health reaches 0, game over.
- Jabba the Hutt (penalty) - if hit, lose points
- The armorer (powerup) - if hit, gain extra health or extra time

## Stretch Goals

- Sound effects & Music
- higher level enemies that requires multiple hits to eliminate + powerups appear to counter
- high score stored in instance - in future store in database (localStorage)
