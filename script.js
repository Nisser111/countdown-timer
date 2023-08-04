const daysDisplay = document.querySelector("#days-display");
const hoursDisplay = document.querySelector("#hours-display");
const minutesDisplay = document.querySelector("#minutes-display");
const secoundsDisplay = document.querySelector("#secounds-display");

const countdownDate = new Date("Mar 3, 2024 00:00:00").getTime();
const countdown = setInterval(() => {
  const now = new Date().getTime();
  let timeLeft = countdownDate - now;

  // Calculating the days, hours, minutes and seconds left
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Set current values
  daysDisplay.value = days;
  hoursDisplay.value = hours;
  minutesDisplay.value = minutes;
  secoundsDisplay.value = seconds;

  // When countdown is over
  if (timeLeft < 0) clearInterval(countdown);
}, 1000);

window.onload = () => {
  countdown();
};
