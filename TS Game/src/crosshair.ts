// Importing the crosshair styling from the CSS document
import "./crosshair.css";

// Selecting the crosshair element from the DOM
export const crosshair = document.querySelector<HTMLDataElement>(
  "[data-crosshair]"
) as HTMLElement;

// Selecting the game container element from the DOM
export const gameContainer = document.querySelector<HTMLDivElement>(
  "#gameContainer"
) as HTMLElement;

// Adding a mousemove event listener to the game container
gameContainer.addEventListener("mousemove", function (event: MouseEvent) {
  // Getting the X and Y coordinates of the user's mouse cursor
  const userX = event.clientX;
  const userY = event.clientY;

  // Setting transition to 0 seconds to prevent stuttering crosshair movement
  crosshair.style.transition = "0s";

  // Positioning the crosshair at the user's cursor position by styling the div's x and y coordinates
  crosshair.style.left = `${userX}px`;
  crosshair.style.top = `${userY}px`;
});

// Adding a mouseout event listener to the document
document.onmouseout = (_event) => {
  // Setting transition to 1 second for smooth transition
  crosshair.style.transition = "1s";

  // Centering the crosshair when the mouse leaves the game area
  crosshair.style.left = "50%";
  crosshair.style.top = "50%";
};
