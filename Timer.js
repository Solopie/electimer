class Timer {
    constructor(timeElement) {
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
        /*
        States:
        0 - not started
        1 - running
        2 - paused
        */
        this.state = 0
        this.timeElement = timeElement
        this.id = null
    }

    start() {
        if (this.id) {
            throw "Timer is already running"
        }
        if (this.state == 0) {
            this.reset_time()
        }
        this.state = 1

        let prevSecond = Date.now()
        let timeNow = Date.now()

        this.id = setInterval(() => {
            if (timeNow - prevSecond > 1000) {
                this.add_second()
                this.timeElement.innerHTML = this.toString()
                prevSecond = Date.now()
            }
            timeNow = Date.now()
        }, 200)
    }

    add_second() {
        this.seconds += 1
        this.verify_time()
    }

    verify_time() {
        if (this.seconds >= 60) {
            this.minutes += parseInt(this.seconds / 60)
            this.seconds = this.seconds % 60
        }
        if (this.minutes >= 60) {
            this.hours += parseInt(this.minutes / 60)
            this.minutes = this.minutes % 60
        }
        if (this.hours >= 24) {
            this.reset_time()
        }
    }
    reset_time() {
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
        if (this.id) {
            clearInterval(this.id)
            this.id = null
        }
        this.state = 0
        this.timeElement.innerHTML = "00:00:00"
    }

    pause_time() {
        if (this.id) {
            clearInterval(this.id)
            this.id = null
        }
        this.state = 2
    }

    toString() {
        let h = this.hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        })
        let m = this.minutes.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        })
        let s = this.seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        })
        return `${h}:${m}:${s}`
    }
}

export default Timer
