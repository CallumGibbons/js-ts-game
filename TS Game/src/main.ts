import "./style.css";
import {
  stopTimer,
  getTimeLeft,
  startCountdown,
  timerCounter,
} from "./countdown";
import { gameContainer, crosshair } from "./crosshair";
import {
  resetTargetsHit,
  targetsHit,
  hittableTarget,
  heightMax,
  widthMax,
  heightMin,
  widthMin,
  target,
} from "./target";

const startText = document.querySelector<HTMLDivElement>("#gameText--Start");
const startButton =
  document.querySelector<HTMLButtonElement>("#gameButtonStart");
const resetButton =
  document.querySelector<HTMLButtonElement>("#gameButtonReset");
const gunshot = document.querySelector<HTMLAudioElement>("audio");
const stats = document.querySelector<HTMLHeadingElement>(
  "#gameStats"
) as HTMLElement;

let isPaused: boolean = false;
let isTargetHittable: boolean = true;
let scoreGoal = 1500;
let storedScore = 0;
let timeLeft = 0;
let roundCounter = 0;
let gameState = 0;
export let shotsHit: number = 0;
let totalShots: number = 0;
const targetScore: number = 150;
export let difficultyScale: number = 1;

if (
  !timerCounter ||
  !crosshair ||
  !gameContainer ||
  !gunshot ||
  !target ||
  !startText ||
  !startButton ||
  !resetButton ||
  !stats
) {
  throw new Error("Issue with selectors");
}

const displayRoundNumber = (roundNumber: number) => {
  startText.textContent = `Round ${roundNumber}`;
  startText.style.display = "inherit";
  setTimeout(() => {
    startText.style.display = "none";
    isPaused = false; // Resume the game
    isTargetHittable = true; // Make the target hittable again
  }, 3000);
};

const roundPass = () => {
  startCountdown();
  roundCounter++;
  storedScore += targetsHit * targetScore;
  difficultyScale -= 0.1;
  scoreGoal *= 1.2;
  if (storedScore >= scoreGoal) {
    resetTargetsHit();
    isPaused = true; // Pause the game
    isTargetHittable = false; // Make the target unhittable
    roundStart(); // Start the next round
    // Display the round number with a three-second delay
    setTimeout(() => {
      displayRoundNumber(roundCounter + 1);
    }, 3000);
  }
};

const roundFail = () => {
  gameState = 0;
  roundCounter = 0;
  storedScore = 0;
  difficultyScale = 1;
  scoreGoal = 1500;
};

const stopGame = () => {
  isPaused = true;
  isTargetHittable = false;
  stopTimer();
  startText.textContent = `Final Score: ${storedScore}`;
  startText.style.display = "inherit";
};

const gameRunning = () => {
  if (!isPaused) {
    timeLeft = getTimeLeft();
    if (timeLeft === 0) {
      if (targetsHit * targetScore >= scoreGoal) {
        roundPass();
      } else {
        roundFail();
      }
      stopGame();
    } else if (targetsHit * targetScore >= scoreGoal) {
      roundPass();
    }
  }
};
const roundStart = () => {
  if (gameState === 1) {
    hittableTarget();
    target.style.display = "none";
    startText.style.display = "inherit";
    setTimeout(function () {
      startText.textContent = `Round ${roundCounter + 1}`;
      setTimeout(function () {
        startText.style.display = "none";
        target.style.display = "inherit";
        startCountdown();
      }, 3000);
    }, 3000);
    target.style.left = Math.random() * (widthMax - widthMin) + widthMin + "%";
    target.style.top =
      Math.random() * (heightMax - heightMin) + heightMin + "%";
    gameState = 0;
  }
};

const startClicked = () => {
  difficultyScale = 1;
  gameState = 1;
  roundStart();
  setInterval(() => {
    gameRunning();
  }, 1000);
};

const bulletShot = () => {
  if (!isPaused && isTargetHittable) {
    totalShots++;
    gunshot.volume = 0.2;
    gunshot.currentTime = 0;
    gunshot.play();
    stats.innerHTML =
      "Shots Fired:" +
      totalShots +
      " Points:" +
      targetsHit * targetScore +
      " Accuracy: " +
      ((targetsHit / totalShots) * 100).toFixed(3) +
      "%";
  }
};

const resetClicked = () => {
  resetTargetsHit();
  roundCounter = 0;
  gameState = 0;
  shotsHit = 0;
  totalShots = 0;
  storedScore = 0;
  difficultyScale = 1;
  scoreGoal = 1500;
  isPaused = false;
  isTargetHittable = true;
  startText.style.display = "none";
  timerCounter.innerHTML = "";
  stopTimer();
};

startButton.addEventListener("click", startClicked);
resetButton.addEventListener("click", resetClicked);
gameContainer.addEventListener("click", bulletShot);
