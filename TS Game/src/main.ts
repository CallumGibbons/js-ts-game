import "./style.css";


const timerId = setInterval(countdown, 1000);
let widthMin = 15;
let widthMax = 85;
let heightMin = 10;
let heightMax = 75;
let roundCounter = 0;
let gameState = 0;
let score: number = 0;
let shotsHit: number = 0;
let totalShots: number = 0;
let shotsMissed: number = totalShots - shotsHit;
let currentScore: number = 0;
let targetsHit: number = 0;
let targetScore: number = 150;
let accuracy: number = (shotsMissed / totalShots) * 100;
let roundTimer: number = 30;
let difficultyScale: number = 1;
let timeLeft = 30;

const timerCounter = document.querySelector("#timer") as HTMLElement;
const startText = document.querySelector<HTMLDivElement>("#gameText--Start");
const startButton =
  document.querySelector<HTMLButtonElement>("#gameButtonStart");
const resetButton =
  document.querySelector<HTMLButtonElement>("#gameButtonReset");
const target = document.querySelector<HTMLDivElement>(".target") as HTMLElement;
const gunshot = document.querySelector<HTMLAudioElement>("audio");
const crosshair = document.querySelector<HTMLDataElement>("[data-crosshair]");
const gameContainer = document.querySelector<HTMLDivElement>("#gameContainer");

if (
  !crosshair ||
  !gameContainer ||
  !gunshot ||
  !target ||
  !startText ||
  !startButton ||
  !timerCounter ||
  !resetButton
) {
  throw new Error("Issue with selectors");
}



function countdown() {
  if (timeLeft == -1) {
    clearTimeout(timerId);
  } else {
    timerCounter.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
}

startButton.addEventListener("click", (_click: MouseEvent) => {
  gameState += 1;
  if (gameState = 1) {
    startText.style.display = "inherit";
    setTimeout(function () {
      startText.style.display = "none";
      target.style.display = "inherit";
      return countdown();
    }, 3000);
    gameState = 0;
    timeLeft = 30
    return countdown()
    
  } else {
    totalShots = 0;
    gameState = 0;
    target.style.display = "none";
  }
  console.log(gameState);
});

target.addEventListener("click", (_click: MouseEvent) => {
  target.style.transition = "1s";
  target.style.left = (Math.random()) * (widthMax-widthMin) + widthMin +"%";
  target.style.top = (Math.random()) * (heightMax-heightMin) + heightMin +"%";
  console.log(target.style.top)
  console.log(target.style.left)
  targetsHit += 1;
  shotsHit += 1;
  currentScore = currentScore + targetScore;
  console.log(currentScore);
  console.log(targetsHit);
});

gameContainer.addEventListener("click", (_click: MouseEvent) => {
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
document.onmouseout = (_event) => {
  crosshair.style.transition = "1s";
  crosshair.style.left = "50%";
  crosshair.style.top = "50%";
};

resetButton.addEventListener("click", (_click: MouseEvent) => {
  roundCounter = 0;
  gameState = 0;
  score = 0;
  shotsHit = 0;
  totalShots = 0;
  shotsMissed = 0;
  currentScore = 0;
  targetsHit = 0;
  targetScore = 150;
  accuracy = 0;
  roundTimer = 30;
  difficultyScale = 1;
  target.style.display = "none";
});
