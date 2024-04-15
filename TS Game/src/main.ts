import "./style.css";
import {
  stopTimer,
  getTimeLeft,
  startCountdown,
  timerCounter,
} from "./countdown";
import { gameContainer } from "./crosshair";
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

const startText = document.querySelector<HTMLDivElement>(
  "#gameText--Start"
) as HTMLElement;
const startButton = document.querySelector<HTMLButtonElement>(
  "#gameButtonStart"
) as HTMLElement;
const resetButton = document.querySelector<HTMLButtonElement>(
  "#gameButtonReset"
) as HTMLElement;
const gunshot = document.querySelector<HTMLAudioElement>(
  "audio"
) as HTMLAudioElement;
const stats = document.querySelector<HTMLHeadingElement>(
  "#gameStats"
) as HTMLElement;

let isPaused: boolean = false;
let isTargetHittable: boolean = true;
let scoreGoal: number = 1500;
let storedScore: number = 0;
let roundCounter: number = 0;
let gameState: number = 0;
let totalShots: number = 0;
export let difficultyScale: number = 1;
const targetScore: number = 150;
let currentScore: number = 0;

const displayRoundNumber = (roundCounter: number) => {
  startText.textContent = `Round ${roundCounter}`;
  startText.style.display = "inherit";
  setTimeout(() => {
    startText.style.display = "none";
    isPaused = false;
    isTargetHittable = true;
  }, 3000);
};

const roundPass = () => {
  roundCounter++;
  storedScore += currentScore; // Store the current score at the end of the round
  currentScore = 0; // Reset current score to zero
  difficultyScale -= 0.1;
  if (storedScore >= scoreGoal) {
    resetTargetsHit();
    scoreGoal *= 1.2;
    isPaused = true;
    isTargetHittable = false;
    roundStart();
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
    const timeLeft = getTimeLeft();
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
    startText.style.display = "inherit";
    target.style.display = "none";
    setTimeout(() => {
      startText.textContent = `Round ${roundCounter + 1}`;
      setTimeout(() => {
        startText.style.display = "none";
        if (isTargetHittable) {
          target.style.display = "inherit"; // Display the target if hittable
          startCountdown(); // Start the timer after the delay
        } else {
          target.style.display = "none"; // Hide the target if not hittable
        }
      }, 3000); // Wait for 3 seconds before displaying the target
    }, 3000); // Wait for 3 seconds before updating the round text
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
  setInterval(gameRunning, 1000);
};

const bulletShot = () => {
  if (!isPaused && isTargetHittable) {
    totalShots++;
    currentScore += targetScore; // Increment current score with each shot
    gunshot.volume = 0.2;
    gunshot.currentTime = 0;
    gunshot.play();
    stats.innerHTML = `Round Number: ${roundCounter} Shots Fired: ${totalShots} Current Points: ${currentScore} Target Score: ${scoreGoal} Total Points: ${storedScore} Accuracy: ${(
      (targetsHit / totalShots) *
      100
    ).toFixed(3)}%`;
  }
};

const resetClicked = () => {
  totalShots = 0;
  resetTargetsHit();
  roundCounter = 0;
  gameState = 0;
  storedScore = 0;
  difficultyScale = 1;
  scoreGoal = 1500;
  isPaused = false;
  isTargetHittable = true;
  startText.style.display = "none";
  timerCounter.innerHTML = "";
  stopTimer();
  stats.innerHTML = `Round Number: ${roundCounter} Shots Fired: ${totalShots} Current Points: ${currentScore} Target Score: ${scoreGoal} Total Points: ${storedScore} Accuracy: ${(
    (targetsHit / totalShots) *
    100
  ).toFixed(3)}%`;
};

startButton.addEventListener("click", startClicked);
resetButton.addEventListener("click", resetClicked);
gameContainer.addEventListener("click", bulletShot);
