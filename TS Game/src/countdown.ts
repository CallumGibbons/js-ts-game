export const timerCounter = document.querySelector("#timer") as HTMLElement;
import { difficultyScale } from "./main";

let timeLeft: number = 30;
let timerId: ReturnType<typeof setInterval>;

export function startCountdown(): void {
  clearTimeout(timerId);
  timeLeft = 30 * difficultyScale;
  timerId = setInterval(countdown, 1000);
}

export function countdown(): void {
  if (timeLeft === 0) {
    clearTimeout(timerId);
  } else {
    timerCounter.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
}

export function getTimeLeft(): number {
  return timeLeft;
}

export function stopTimer(): void {
    clearInterval(timerId);
}
