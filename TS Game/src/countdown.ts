const timerCounter = document.querySelector("#timer") as HTMLElement;


export function startCountdown(seconds: number) {
    let counter = seconds;
      
    const interval = setInterval(() => {
        timerCounter.innerHTML = counter + " seconds remaining";
      counter--;
        
      if (counter < 0 ) {
        clearInterval(interval);
      }
    }, 1000);
  }
