import "./style.css";

export const crosshair = document.querySelector<HTMLDataElement>(
  "[data-crosshair]"
) as HTMLElement;
export const gameContainer = document.querySelector<HTMLDivElement>(
  "#gameContainer"
) as HTMLElement;

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
