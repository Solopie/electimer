class Timer {
    constructor(targetTime, timeElement) {
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
        try {
            this.verify_target(targetTime)
            this.targetTime = targetTime
        } catch (error) {
            console.log(error)
            alert(error)
            this.targetTime = "24:00:00"
        }
        this.id = null
    }

    calculate_total_seconds(given) {
        this.verify_target(given)
        let givenArr = given.split(":")
        return (
            parseInt(givenArr[2]) +
            60 * parseInt(givenArr[1]) +
            60 * 60 * parseInt(givenArr[0])
        )
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
            if (
                this.calculate_total_seconds(this.toString()) >=
                this.calculate_total_seconds(this.targetTime)
            ) {
                console.log("Timer finished!")
                clearInterval(this.id)
                this.id = null
                this.state = 0
            }
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
            console.log("Time limit exceeded")
            this.reset_time()
        }
    }

    verify_target(target) {
        let targetArr = target.split(":")
        if (targetArr.length !== 3) {
            throw "Invalid target time - not enough time values (expected 3 - 99:99:99)"
        }

        let s, m, h
        try {
            s = parseInt(targetArr[2])
            m = parseInt(targetArr[1])
            h = parseInt(targetArr[0])
        } catch (error) {
            throw "Invalid target time - time value is not a number"
        }
        if (s >= 60) {
            m += parseInt(s / 60)
            s = s % 60
        }
        if (m >= 60) {
            h += parseInt(m / 60)
            m = m % 60
        }
        if (h >= 24) {
            throw "Invalid target time - Target time exceeds 24 hrs (not allowed)"
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
        this.timeElement = "00:00:00"
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
