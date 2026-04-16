//Audio elements
const blasterSFX = new Audio("Assets/Audio/sfx/sfx-blaster.mp3");
const trooperHitSFX = new Audio("Assets/Audio/sfx/sfx-stormtrooper-hit.mp3");
const darkTrooperHitSFX = new Audio("Assets/Audio/sfx/sfx-darktrooper.mp3");
const jabbaHitSFX = new Audio("Assets/Audio/sfx/sfx-jabba.mp3");
const groguHitSFX = new Audio("Assets/Audio/sfx/sfx-bad-baby.mp3");
const gameOverSFX = new Audio("Assets/Audio/sfx/sfx-mando.mp3");
const gameOverVoiceSFX = new Audio("Assets/Audio/sfx/sfx-mando-odds.mp3");
const backgroundMusic = new Audio("Assets/Audio/music/bgm.mp3");
const startButtonHoverSFX = new Audio("Assets/Audio/sfx/sfx-hyperspace.mp3");

function playBlasterSFX() {
  blasterSFX.currentTime = 0; // Reset to start for rapid firing
  blasterSFX.volume = 0.5;
  blasterSFX.play();
}

function playTrooperHitSFX() {
  trooperHitSFX.currentTime = 0;
  trooperHitSFX.play();
}

function playGroguHitSFX() {
  groguHitSFX.currentTime = 0;
  groguHitSFX.volume = 0.5;
  groguHitSFX.play();
}

function playDarkTrooperHitSFX() {
  darkTrooperHitSFX.currentTime = 0;
  darkTrooperHitSFX.volume = 0.6;
  darkTrooperHitSFX.play();
}

function playJabbaHitSFX() {
  jabbaHitSFX.currentTime = 0;
  jabbaHitSFX.volume = 1;
  jabbaHitSFX.play();
}

function playTimeRechargeSFX() {
  timeRechargeSFX.currentTime = 0;
  timeRechargeSFX.play();
}

function playBackgroundMusic() {
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.4;
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function playGameOverSFX() {
  gameOverSFX.currentTime = 0;
  gameOverSFX.play();
}

function playGameOverVoiceSFX() {
  gameOverVoiceSFX.currentTime = 0;
  gameOverVoiceSFX.play();
}

function playStartButtonHoverSFX() {
  startButtonHoverSFX.currentTime = 0;
  startButtonHoverSFX.volume = 0.8;
  startButtonHoverSFX.play();
}

function stopStartButtonHoverSFX() {
  startButtonHoverSFX.pause();
  startButtonHoverSFX.currentTime = 0;
}
