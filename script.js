function reloadCountdownTimer(date) {
  const daysDisplay = document.querySelector("#days-display");
  const hoursDisplay = document.querySelector("#hours-display");
  const minutesDisplay = document.querySelector("#minutes-display");
  const secoundsDisplay = document.querySelector("#secounds-display");

  const countdownDate = date.getTime();
  let countdown = setInterval(() => {
    const now = new Date().getTime();
    let timeLeft = countdownDate - now;

    // Calculating the days, hours, minutes and seconds left
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Set current values
    daysDisplay.value = days;
    hoursDisplay.value = hours.toString().padStart(2, "0");
    minutesDisplay.value = minutes.toString().padStart(2, "0");
    secoundsDisplay.value = seconds.toString().padStart(2, "0");

    // When countdown is over
    if (timeLeft < 0) {
      clearInterval(countdown);
      timerEnd();
    };
  }, 1000);

  return countdown;
}

// Modify finalDate to different formats
function getFinalDateInfo(date, isDatetimeLocalFormat = false) {
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

  if (isDatetimeLocalFormat) {
    let [dateString, timeString] = date.split("T");
    let [year, month, days] = dateString.split("-");
    let [hours, minutes] = timeString.split(":");

    date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(days),
      parseInt(hours),
      parseInt(minutes)
    );
  }

  let nameOfDay = days[date.getDay()];
  let day = date.getDate();
  let nameOfMonth = mounths[date.getMonth()];
  let year = date.getFullYear();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");

  let dateInfo = `${nameOfDay}, ${day} ${nameOfMonth} ${year} ${hours}:${minutes}`;

  return {
    datetimeLocalFormat: `${year}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}T${hours}:${minutes}`,
    dateInfo: dateInfo,
    dateNormalFormat: date,
  };
}

function reloadFinalDateDisplay(newFinalDate) {
  document.querySelector("#countdown-date-display").innerHTML =
    getFinalDateInfo(newFinalDate).dateInfo;
}

function timerEnd() {
  document.querySelector(".timer").classList.toggle("end");
}

window.onload = function () {
  const body = document.querySelector("body");
  const title = document.querySelector("main header h1");
  const editSettingBtn = document.querySelector("#edit-button");
  const settingsWindow = document.querySelector("#settings");
  const titleInput = document.querySelector("#settings input[type='text']");
  const dateInput = document.querySelector("#settings input[type='datetime-local']");
  const buttons = document.querySelectorAll("#settings button");
  const changeThemeButton = document.querySelector(".theme-container header");

  const now = new Date();
  let finalDate =
  new Date(localStorage.getItem("finalDate")) ||
  new Date(now.getFullYear(), 11, 31, 0, 0, 0);
  
  const avaiavbleColorScheme = [
    "light",
    "dark",
    "holiday",
    "new-year",
    "birthday",
  ];

  // Set current color scheme
  let currentColorScheme = body.classList.value;

  // Start countdown timer
  let previousCountdownId = reloadCountdownTimer(finalDate);

  // Render readable string
  reloadFinalDateDisplay(finalDate);

  // Load previous title if exist
  title.innerHTML = localStorage.getItem("title") || "NEW YEAR";

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

  // Edit title and final date
  titleInput.value = title.innerHTML;
  dateInput.value = getFinalDateInfo(finalDate).datetimeLocalFormat;

  editSettingBtn.addEventListener("click", () => {
    settingsWindow.classList.toggle("active");

    // Cancel button
    buttons[0].addEventListener("click", () => {
      titleInput.value = title.innerHTML;
      dateInput.value = getFinalDateInfo(finalDate).datetimeLocalFormat;

      settingsWindow.classList.remove("active");
    });

    // Save button
    buttons[1].addEventListener("click", () => {
      let tempFinalDate = getFinalDateInfo(dateInput.value, true);
      if(tempFinalDate.dateNormalFormat.getTime() >= now.getTime()) {
        titleInput.value = title.innerHTML = titleInput.value;
        reloadFinalDateDisplay(tempFinalDate.dateNormalFormat);
        finalDate = tempFinalDate.dateNormalFormat;
        clearInterval(previousCountdownId);
        previousCountdownId = reloadCountdownTimer(finalDate);
        document.querySelector(".timer").classList.remove("end");
      } else {
        document.querySelector(".timer").classList.add("end");
      }
      
      settingsWindow.classList.remove("active");
    });
  });

  // Onlcick changing theme panel
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
            document.querySelector(".theme-pattern.current").classList.remove("current");
            e.target.classList.add("current");
            currentColorScheme = choosedPattern;

            localStorage.setItem("colorScheme", currentColorScheme);
          }
        })
      );
    }
  });
};

window.addEventListener("beforeunload", () => {
  const title = document.querySelector("main header h1").innerHTML;

  if (!localStorage.getItem("title")) {
    localStorage.setItem("title", title);
  } else {
    localStorage.title = title;
  }

  if (!localStorage.getItem("date")) {
    localStorage.setItem("finalDate", finalDate);
  } else {
    localStorage.finalDate = finalDate;
  }
});
