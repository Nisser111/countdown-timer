let intervalId;

function countdown() {
    const days = document.querySelector("#days-display");
    const hours = document.querySelector("#hour-display");
    const minutes = document.querySelector("#minutes-display");
    const secounds = document.querySelector("#secounds-display");

    if(secounds > 0) {
        clearInterval(intervalId);
        days.value = "00";
        minutes.value = "00";
        hours.value = "00";
        secounds.value = "00";
    } else if( secounds > 0 && secounds < 0 ) {
        secounds.value--;
    }


}

window.onload = () => {
    if(!intervalId)
        intervalId = setInterval(countdown, 1000)
}

