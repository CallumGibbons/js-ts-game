import { difficultyScale } from "./main";
import { targetScore } from "./main";

let currentScore: number = 0;
let targetsHit: number = 0;
export let widthMin = 15;
export let widthMax = 85;
export let heightMin = 10;
export let heightMax = 75;
export const target = document.querySelector<HTMLDivElement>(".target") as HTMLElement;

export const hittableTarget = () => {
target.addEventListener("click", (_click: MouseEvent) => {
    target.style.transition = 1 * difficultyScale + "s";
    target.style.left = Math.random() * (widthMax - widthMin) + widthMin + "%";
    target.style.top = Math.random() * (heightMax - heightMin) + heightMin + "%";
    console.log(target.style.top);
    console.log(target.style.left);
    targetsHit += 1;
    currentScore = currentScore + targetScore;
    console.log(currentScore);
    console.log(targetsHit);
  });
}