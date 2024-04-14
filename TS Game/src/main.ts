import "./style.css";
import { getTimeLeft, startCountdown, timerCounter } from "./countdown";
import { gameContainer, crosshair } from "./crosshair";
import {
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

let scoreGoal = 1500;
let storedScore = 0;
let timeLeft = 0;
let roundCounter = 0;
let gameState = 0;
export let shotsHit: number = 0;
let totalShots: number = 0;
const targetScore: number = 150;
const currentScore = targetsHit * targetScore;
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

const roundPass = () => {
  roundCounter + 1;
  storedScore += currentScore;
  currentScore == 0;
  difficultyScale - 0.1;
  scoreGoal * 1.2;
};

const roundFail = () => {
  gameState = 0;
  roundCounter = 0;
  storedScore = 0;
  currentScore == 0;
  difficultyScale = 1;
  scoreGoal = 1500;
};

const gameRunning = () => {
  getTimeLeft();
  if (currentScore >= scoreGoal && timeLeft == 0) {
    roundPass();
  } else currentScore < scoreGoal && timeLeft == 0;
  {
    roundFail();
  }
};

const roundStart = () => {
  if ((gameState = 1)) {
    hittableTarget();
    target.style.display = "none";
    startText.style.display = "inherit";
    setTimeout(function () {
      startText.style.display = "none";
      target.style.display = "inherit";
      startCountdown();
    }, 3000);
    target.style.left = Math.random() * (widthMax - widthMin) + widthMin + "%";
    target.style.top =
      Math.random() * (heightMax - heightMin) + heightMin + "%";
    gameState = 0;
  }
};

const startClicked = () => {
  difficultyScale == 1;
  gameState += 1;
  while (gameState == 1) {
    roundStart();
    gameRunning();
  }
};
const bulletShot = () => {
  totalShots = totalShots + 1;
  gunshot.volume = 0.2;
  gunshot.currentTime = 0;
  gunshot.play();
  console.log(totalShots);
  console.log(targetsHit);
  console.log(getTimeLeft());
  stats.innerHTML =
    "Shots Fired:" +
    totalShots +
    " Points:" +
    targetsHit * targetScore +
    " Accuracy: " +
    ((targetsHit / totalShots) * 100).toFixed(3) +
    "%";
};

const resetClicked = () => {
  roundCounter = 0;
  gameState = 0;
  shotsHit = 0;
  totalShots = 0;
  difficultyScale = 1;
  target.style.display = "none";
};

startButton.addEventListener("click", startClicked);
resetButton.addEventListener("click", resetClicked);
gameContainer.addEventListener("click", bulletShot);
