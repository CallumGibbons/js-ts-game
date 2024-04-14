export const timerCounter = document.querySelector("#timer") as HTMLElement;

let timeLeft: number = 30;
let timerId: ReturnType<typeof setInterval>;

export function startCountdown(): void {
  timeLeft = 30;
  timerId = setInterval(countdown, 1000);
}

export function countdown(): void {
  if (timeLeft === 0) {
    clearInterval(timerId);
  }
  {
    timerCounter.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
}

export function getTimeLeft(): number {
  return timeLeft;
}
