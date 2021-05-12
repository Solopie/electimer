import Timer from "./Timer.js"

let timeElement = document.getElementById("time")
let timer = new Timer(timeElement)
let startButton = document.getElementById("start-button")
let stopButton = document.getElementById("stop-button")
let resetButton = document.getElementById("reset-button")

startButton.onclick = startTimer
stopButton.onclick = stopTimer
resetButton.onclick = () => {
    timer.reset_time()
    timeElement.innerHTML = "00:00:00"
}

function startTimer() {
    timer.start(timeElement)
}

function stopTimer() {
    timer.pause_time()
}
