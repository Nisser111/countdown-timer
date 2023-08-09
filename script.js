const daysDisplay = document.querySelector("#days-display");
const hoursDisplay = document.querySelector("#hours-display");
const minutesDisplay = document.querySelector("#minutes-display");
const secoundsDisplay = document.querySelector("#secounds-display");

let finalDate = new Date("March 3, 2024 05:15:17");

const countdownDate = finalDate.getTime();
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
  hoursDisplay.value = hours.toString().padStart(2, "0");
  minutesDisplay.value = minutes.toString().padStart(2, "0");
  secoundsDisplay.value = seconds.toString().padStart(2, "0");

  // When countdown is over
  if (timeLeft < 0) clearInterval(countdown);
}, 1000);

// Transform data from Date to readable string
function getFinalDateInfo(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const mounths = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let nameOfDay = days[date.getDay()];
  let day = date.getDate();
  let nameOfMounth = mounths[date.getMonth()];
  let year = date.getFullYear();
  let seconds = date.getSeconds().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");

  dateInfo = `${nameOfDay}, ${day} ${nameOfMounth} ${year} ${hours}:${minutes}:${seconds}`;
  return dateInfo;
}

window.onload = function () {
  const body = document.querySelector("body");
  const avaiavbleColorScheme = ["light", "dark", "holiday", "new-year", "birthday"];
  let currentColorScheme = body.classList.value;

  // Render readable string
  const finalDateDisplay = document.querySelector("#countdown-date-display");
  finalDateDisplay.innerHTML = getFinalDateInfo(finalDate);


  // Load color scheme from local storage if exist
  if (localStorage.getItem("colorScheme")) {
    let preferColorScheme = localStorage.getItem("colorScheme");
    body.classList.replace(currentColorScheme, preferColorScheme);
    currentColorScheme = preferColorScheme;
    document.querySelector(".theme-pattern.current").classList.remove("current");
    document.querySelector(".theme-pattern." + currentColorScheme).classList.add("current");
  } else if (
    // Detect user prefers color scheme
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    body.classList = "";
    body.classList.add("dark");
    document.querySelector(".theme-pattern.current").classList.remove("current");
    document.querySelector(".theme-pattern.dark").classList.add("current");
  }

  const changeThemeButton = document.querySelector(".theme-container header");
  changeThemeButton.addEventListener("click", () => {
    const content = document.querySelector(".content");
    content.classList.toggle("active");

    // Changing color scheme
    if (content.classList.contains("active")) {
      let themePatterns = document.querySelectorAll(".theme-pattern");
      themePatterns.forEach((el) =>
        el.addEventListener("click", (e) => {            
          let choosedPattern = avaiavbleColorScheme.find(
            (el) => el === e.target.classList[1]
          );
          if (!choosedPattern)
            alert("Sorry! We have some problems. We can't do this for you.");
          else {
            body.classList = "";
            body.classList.add(choosedPattern);
            document
              .querySelector(".theme-pattern.current")
              .classList.remove("current");
            e.target.classList.add("current");
            currentColorScheme = choosedPattern;

            localStorage.setItem("colorScheme", currentColorScheme);
          }
        })
      );
    }
  });
};
