import "./style.css";

let gameState = 0;
const startBlinkTime = 1000;
let score: number = 0;
let shotsHit: number = 0;
let totalShots: number = 0;
let shotsMissed: number = totalShots - shotsHit;
let currentScore: number = 0;
let targetsHit: number = 0;
let targetScore: number = 150;
let accuracy: number = (shotsMissed / totalShots) * 100;
let roundTimer: number = 30000;
let difficultyScale: number = 1;

const startText = document.querySelector<HTMLDivElement>("#gameText--Start");
const startButton =
  document.querySelector<HTMLButtonElement>("#gameButtonStart");
const target = document.querySelector<HTMLDivElement>(".target");
const gunshot = document.querySelector<HTMLAudioElement>("audio");
const crosshair = document.querySelector<HTMLDataElement>("[data-crosshair]");
const gameContainer = document.querySelector<HTMLDivElement>("#gameContainer");

if (
  !crosshair ||
  !gameContainer ||
  !gunshot ||
  !target ||
  !startText ||
  !startButton
) {
  throw new Error("Issue with selectors");
}

startButton.addEventListener("click", (click: MouseEvent) => {
  target.style.display = "inherit";
  (startText.style.visibility =
    startText.style.visibility == "hidden" ? "" : "hidden"),
    startBlinkTime;
});

target.addEventListener("click", (click: MouseEvent) => {
  targetsHit + 1;
  shotsHit + 1;
  currentScore = currentScore + targetScore;
  console.log(currentScore);
});

gameContainer.addEventListener("click", (click: MouseEvent) => {
  totalShots = totalShots + 1;
  gunshot.volume = 0.2;
  gunshot.currentTime = 0;
  gunshot.play();
  console.log(totalShots);
});

gameContainer.addEventListener("mousemove", function (event: MouseEvent) {
  const userX = event.clientX;
  const userY = event.clientY;
  console.log(event);

  crosshair.style.transition = "0s";
  crosshair.style.left = `${userX}px`;
  crosshair.style.top = `${userY}px`;
});
document.onmouseout = (event) => {
  crosshair.style.transition = "1s";
  crosshair.style.left = "50%";
  crosshair.style.top = "50%";
};
