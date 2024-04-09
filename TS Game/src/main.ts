import "./style.css";

let score: number = 0;
let shotsHit: number = 0;
let shotsMissed: number = 0;
let totalShots: number = 0;
let accuracy: number = ((shotsMissed/totalShots)*100);
let roundTimer: number = 30;
let dificutyScale: number = 1;


const crosshair = document.querySelector("[data-crosshair]");
const gameContainer = document.querySelector("#gameContainer");
const shot = document.querySelector("#gameContainer")

if (!crosshair || !gameContainer ||!shot) {
  throw new Error("Issue with selectors");
}

gameContainer.addEventListener("mousemove", function(event) {
  const userX = event.clientX;
  const userY = event.clientY;

  crosshair.style.transition = "0s";
  crosshair.style.left = `${userX}px`;
  crosshair.style.top = `${userY}px`;
});
document.onmouseout = (event) => {
  crosshair.style.transition = "1s";
  crosshair.style.left = "50%";
  crosshair.style.top = "50%";
};

const bulletShot = () => {

}

shot.addEventListener("click", bulletShot);