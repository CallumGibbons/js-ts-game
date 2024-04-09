import "./style.css";

const crosshair = document.querySelector("[data-crosshair]");
const gameContainer = document.querySelector("#gameContainer");

if (!crosshair || !gameContainer) {
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
