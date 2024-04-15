import "./style.css"; // Import CSS styles
import {
  stopTimer,
  getTimeLeft,
  startCountdown,
  timerCounter,
} from "./countdown"; // Import timer-related functions
import { gameContainer } from "./crosshair"; // Import game container
import {
  resetTargetsHit,
  targetsHit,
  hittableTarget,
  heightMax,
  widthMax,
  heightMin,
  widthMin,
  target,
} from "./target"; // Import target-related functions and variables

// Select DOM elements
const startText = document.querySelector<HTMLDivElement>(
  "#gameText--Start"
) as HTMLElement;
const startButton = document.querySelector<HTMLButtonElement>(
  "#gameButtonStart"
) as HTMLButtonElement;
const resetButton = document.querySelector<HTMLButtonElement>(
  "#gameButtonReset"
) as HTMLElement;
export const gunshot = document.querySelector<HTMLAudioElement>(
  "audio"
) as HTMLAudioElement;
const stats = document.querySelector<HTMLHeadingElement>(
  "#gameStats"
) as HTMLElement;

// Define game variables
let totalTargets: number = 0;
let isPaused: boolean = false;
let isTargetHittable: boolean = true;
let scoreGoal: number = 1500;
let storedScore: number = 0;
let roundCounter: number = 0;
let totalShots: number = 0;
export let difficultyScale: number = 1;
const targetScore: number = 150;
let currentScore: number = 0;

// Function to display the round number text
const displayRoundNumber = (roundCounter: number) => {
  startText.textContent = `Round ${roundCounter}`;
  startText.style.display = "inherit";
  setTimeout(() => {
    startText.style.display = "none";
    isPaused = false;
    isTargetHittable = true;
  }, 3000);
};

// Function to handle passing a round
const roundPass = () => {
  target.style.display = "none";
  totalTargets += targetsHit;
  currentScore = 0;
  resetTargetsHit();
  scoreGoal *= 1.2;
  isPaused = true;
  isTargetHittable = false;
  roundCounter += 1;
  currentScore = 0; // Reset current score to zero
  difficultyScale -= 0.1;
  stopTimer();
  setTimeout(() => {
    displayRoundNumber(roundCounter + 1);
    // Hide the target and pause/reset the timer
    target.style.display = "inherit";
    startCountdown();
    roundStart();
  }, 3000);
};

// Function to stop the game
const stopGame = () => {
  isPaused = true;
  isTargetHittable = false;
  stopTimer();
  startText.textContent = `Final Score: ${storedScore}`;
  startText.style.display = "inherit";
  target.style.display = "none";
};

// Function to handle game running logic
const gameRunning = () => {
  if (!isPaused) {
    const timeLeft = getTimeLeft();
    if (timeLeft <= 0) {
      if (currentScore >= scoreGoal) {
        roundPass();
      } else {
        stopGame();
      }
      stopGame();
    } else if (currentScore >= scoreGoal) {
      roundPass();
    }
  }
};

// Function to start a new round
const roundStart = () => {
  hittableTarget();
  startText.style.display = "inherit";
  target.style.display = "none"; // Hide the target initially

  // Show the round number text after 3 seconds
  setTimeout(() => {
    startText.textContent = `Round ${roundCounter + 1}`;

    // Display the target and start the timer after another 3 seconds
    setTimeout(() => {
      startText.style.display = "none";
      if (isTargetHittable) {
        target.style.display = "inherit"; // Display the target if hittable
        startCountdown(); // Start the timer after the delay
      }
    }, 3000); // Wait for 3 seconds before displaying the target
  }, 3000); // Wait for 3 seconds before updating the round text

  // Randomly position the target within the game container
  target.style.left = Math.random() * (widthMax - widthMin) + widthMin + "%";
  target.style.top = Math.random() * (heightMax - heightMin) + heightMin + "%";
};

// Event handler for start button click
const startClicked = () => {
  startButton.disabled = true;
  roundStart();
  setInterval(gameRunning, 1000);
};

// Event handler for target hit
const bulletShot = () => {
  if (!isPaused && isTargetHittable) {
    totalShots++;
    gunshot.volume = 0.2;
    gunshot.currentTime = 0;
    var Accuracy = (storedScore / (totalShots * targetScore)) * 100;
    gunshot.play();
    stats.innerHTML = `Round Number: ${
      roundCounter + 1
    } Shots Fired: ${totalShots} Current Points: ${currentScore} Target Score: ${scoreGoal} Total Points: ${storedScore} Accuracy: ${Accuracy.toFixed(
      3
    )}%`;
  }
};

// Function to increase score when target is hit
const scoreIncrease = () => {
  currentScore += targetScore;
  storedScore += targetScore;
};

// Event handler for reset button click
const resetClicked = () => {
  target.style.display = "none";
  startButton.disabled = false;
  stopTimer();
  isPaused = false;
  isTargetHittable = true;
  totalShots = 0;
  resetTargetsHit();
  roundCounter = 0;
  currentScore = 0;
  scoreGoal = 1500;
  storedScore = 0;
  difficultyScale = 1;
  startText.innerText = "";
  timerCounter.innerHTML = "";
  stats.innerHTML = `Round Number: ${roundCounter} Shots Fired: ${totalShots} Current Points: ${currentScore} Target Score: ${scoreGoal} Total Points: ${storedScore} Accuracy: ${(
    (targetsHit / totalShots) *
    100
  ).toFixed(3)}%`;
};

// Event listener for target click event
target.addEventListener("click", scoreIncrease);

// Event listener for start button click event
startButton.addEventListener("click", startClicked);

// Event listener for reset button click event
resetButton.addEventListener("click", resetClicked);

// Event listener for game container click event (shooting)
gameContainer.addEventListener("click", bulletShot);
