import "./style.css";

const crosshair = document.querySelector("[data-crosshair]");
const container = document.querySelector("#gameContainer");

if (!crosshair || !container) {
  throw new Error("Issue with selectors");
}
