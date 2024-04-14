const timerCounter = document.querySelector("#timer") as HTMLElement;
import { difficultyScale } from "./main";

export const countdown = () => {
  const timerId = setInterval(countdown, 1000);
  let timeLeft = 30 * difficultyScale;
  if (timeLeft == -1) {
    clearTimeout(timerId);
  } else {
    timerCounter.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
};
