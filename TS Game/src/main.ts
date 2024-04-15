import "./style.css";
import { getTimeLeft, startCountdown, timerCounter } from "./countdown";
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

const roundPass = () => {
  roundCounter++;
  storedScore += targetsHit * targetScore;
  difficultyScale -= 0.1;
  scoreGoal *= 1.2;
  if (storedScore >= scoreGoal) {
    resetTargetsHit();
    roundStart();
  }
};

const roundFail = () => {
  gameState = 0;
  roundCounter = 0;
  storedScore = 0;
  difficultyScale = 1;
  scoreGoal = 1500;
};

const gameRunning = () => {
  timeLeft = getTimeLeft();
  if (timeLeft === 0) {
    if ((targetsHit * targetScore) >= scoreGoal) {
      roundPass();
    } else {
      roundFail();
    }
  } else if ((targetsHit * targetScore)>= scoreGoal) {
    roundPass();
  }
};

const roundStart = () => {
  if (gameState === 1) {
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
  difficultyScale = 1;
  gameState = 1;
  roundStart();
  setInterval(() => {
    gameRunning();
  }, 1000);
};

const bulletShot = () => {
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
