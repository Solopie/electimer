import Countdown from "./Countdown.js"

let timeElement = document.getElementById("time")
let timer = new Countdown(timeElement, "00:01:00")
let startButton = document.getElementById("start-button")
let stopButton = document.getElementById("stop-button")
let resetButton = document.getElementById("reset-button")

startButton.onclick = startTimer
stopButton.onclick = stopTimer
resetButton.onclick = () => {
    timer.reset_time()
    timeElement.innerHTML = "00:01:00"
}

function startTimer() {
    timer.start(timeElement)
}

function stopTimer() {
    timer.pause_time()
}
