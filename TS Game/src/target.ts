// Importing necessary functions from main.ts
import { difficultyScale } from "./main";

// setting initial variables to keep track of targets hit and target X and Y range
export let targetsHit: number = 0;
export let widthMin = 15;
export let widthMax = 85;
export let heightMin = 10;
export let heightMax = 75;

// Selecting the target element from the DOM
export const target = document.querySelector<HTMLDivElement>(
  ".target"
) as HTMLElement;

// Creating an audio object for the hit sound
const hitSound = new Audio("../sounds/hit_sound.mp3");

// Function to handle click events on the target element
export const hittableTarget = () => {
  target.addEventListener("click", (_click: MouseEvent) => {
    // Setting transition duration based on difficulty scale, it will move faster as rounds progress
    target.style.transition = 1 * difficultyScale + "s";
    // Randomizing the position of the target in the game container
    target.style.left = Math.random() * (widthMax - widthMin) + widthMin + "%";
    target.style.top =
      Math.random() * (heightMax - heightMin) + heightMin + "%";
    // Adjusting audio settings and playing the hit sound
    hitSound.volume = 0.2; // Setting volume for hit sound
    hitSound.currentTime = 0; // Resetting hit sound to start
    hitSound.play(); // Playing hit sound
    // Incrementing the count of targets hit
    targetsHit += 1;
  });
};

// Function to reset the count of targets hit
export function resetTargetsHit() {
  targetsHit = 0;
}