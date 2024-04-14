import "./style.css";
import { countdown } from "./countdown";
import { crosshair } from "./crosshair";
import { gameContainer } from "./crosshair";
import { target } from "./target";
import { widthMin } from "./target";
import { heightMin } from "./target";
import { widthMax } from "./target";
import { heightMax } from "./target";
import { hittableTarget } from "./target";

let roundCounter = 0;
let gameState = 0;
let score: number = 0;
export let shotsHit: number = 0;
let totalShots: number = 0;
let shotsMissed: number = totalShots - shotsHit;
export let targetScore: number = 150;
let accuracy: number = (shotsMissed / totalShots) * 100;
let roundTimer: number = 30;
export let difficultyScale: number = 1;
let timeLeft = 30;

const startText = document.querySelector<HTMLDivElement>("#gameText--Start");
const startButton =
  document.querySelector<HTMLButtonElement>("#gameButtonStart");
const resetButton =
  document.querySelector<HTMLButtonElement>("#gameButtonReset");
const gunshot = document.querySelector<HTMLAudioElement>("audio");

if (
  !crosshair ||
  !gameContainer ||
  !gunshot ||
  !target ||
  !startText ||
  !startButton ||
  !resetButton
) {
  throw new Error("Issue with selectors");
}

const roundStart = () => {
  if ((gameState = 1)) {
    hittableTarget();
    timeLeft = 0;
    target.style.display = "none";
    startText.style.display = "inherit";
    setTimeout(function () {
      timeLeft = -1;
      startText.style.display = "none";
      target.style.display = "inherit";
    }, 3000);
    countdown();
    target.style.left = Math.random() * (widthMax - widthMin) + widthMin + "%";
    target.style.top =
      Math.random() * (heightMax - heightMin) + heightMin + "%";
    gameState = 0;
  }
};

startButton.addEventListener("click", (_click: MouseEvent) => {
  difficultyScale == 1;
  gameState += 1;
  roundStart();
  totalShots == 0;
});

gameContainer.addEventListener("click", (_click: MouseEvent) => {
  totalShots = totalShots + 1;
  gunshot.volume = 0.2;
  gunshot.currentTime = 0;
  gunshot.play();
  console.log(totalShots);
});

resetButton.addEventListener("click", (_click: MouseEvent) => {
  roundCounter = 0;
  gameState = 0;
  score = 0;
  shotsHit = 0;
  totalShots = 0;
  shotsMissed = 0;
  targetScore = 150;
  accuracy = 0;
  roundTimer = 30;
  difficultyScale = 1;
  target.style.display = "none";
});
