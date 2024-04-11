import "./style.css";

let score: number = 0;
let shotsHit: number = 0;
let shotsMissed: number = 0;
let currentScore: number = 0;
let targetScore: number = 0;
let totalShots: number = 0;
let accuracy: number = (shotsMissed / totalShots) * 100;
let roundTimer: number = 30;
let dificutyScale: number = 1;

const start = document.querySelector(".gameButtonStart")
const gunshot = document.querySelector("audio");
const crosshair = document.querySelector<HTMLDataElement>("[data-crosshair]");
const gameContainer = document.querySelector<HTMLDivElement>("#gameContainer");

if (!crosshair || !gameContainer || !gunshot) {
  throw new Error("Issue with selectors");
}



gameContainer.addEventListener("click", click => {
  gunshot.volume = 0.2;
  gunshot.currentTime = 0;
  gunshot.play();
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
