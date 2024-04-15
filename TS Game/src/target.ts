import { difficultyScale } from "./main";
import { gunshot } from "./main";

export let targetsHit: number = 0;
export let widthMin = 15;
export let widthMax = 85;
export let heightMin = 10;
export let heightMax = 75;
export const target = document.querySelector<HTMLDivElement>(
  ".target"
) as HTMLElement;

const hitSound = new Audio("../sounds/hit_sound.mp3");

export const hittableTarget = () => {
  target.addEventListener("click", (_click: MouseEvent) => {
    target.style.transition = 1 * difficultyScale + "s";
    target.style.left = Math.random() * (widthMax - widthMin) + widthMin + "%";
    target.style.top =
      Math.random() * (heightMax - heightMin) + heightMin + "%";
    console.log(target.style.top);
    console.log(target.style.left);
    gunshot.volume = 0;
    hitSound.volume = 0.2;
    hitSound.currentTime = 0;
    hitSound.play();
    targetsHit += 1;
    console.log(targetsHit);
  });
};

export function resetTargetsHit() {
  targetsHit = 0;
}
