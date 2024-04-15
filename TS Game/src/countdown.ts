// Import the difficultyScale from main.ts for time scaling
import { difficultyScale } from "./main";

// query select the timer element from the html
export const timerCounter = document.querySelector("#timer") as HTMLElement;

// set timeLeft to default 30 seconds
export let timeLeft: number = 30;

// Declare timerId variable to store the interval returned by setInterval below, allowing timer length to be adjusted
let timerId: ReturnType<typeof setInterval>;

// Function to start the countdown timer
export function startCountdown(): void {
  // Clear any existing timer
  clearTimeout(timerId);
  // Set timeLeft based on the difficulty scale
  timeLeft = 30 * difficultyScale;
  // Start the countdown by calling countdown function every 1000ms (1 second)
  timerId = setInterval(countdown, 1000);
}

// Function called every second to update the countdown
export function countdown(): void {
  // If timeLeft reaches 0, clear the interval
  if (timeLeft === 0) {
    timerCounter.innerHTML = "0 seconds remaining";
    clearTimeout(timerId);
  } else {
    // Update the timerCounter element with the remaining time
    timerCounter.innerHTML = Math.floor(timeLeft) + " seconds remaining";
    // Decrease the timeLeft by 1 second
    timeLeft--;
  }
}

// Function to get the current timeLeft value
export function getTimeLeft(): number {
  return timeLeft;
}

// Function to stop the timer and reset timeLeft to its initial value
export function stopTimer(): void {
  clearInterval(timerId);
  timeLeft = 30;
}
