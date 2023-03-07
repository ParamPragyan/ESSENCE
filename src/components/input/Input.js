import { useEffect, useState } from 'react'
import React from 'react'
import moment from 'moment/moment'
import './input.css'
let interval
function Input(props) {
  const [timeLeft, setTimeLeft] = useState(0)
  function calculateTimeLeft() {
    const flag = props.flag
    let difference = 0
    if (flag) {
      difference = +props.date - moment()
    } else {
      difference = 0
    }

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    if (difference <= 0) {
      clearInterval(interval)
      clearInterval(props.intervalRef.current)
    }
    console.log(difference)
    console.log('calculating')
    setTimeLeft(timeLeft)
    console.log(timeLeft)
  }

  useEffect(() => {
    console.log('props flag value ' + props.flag)
    if (props.flag) {
      interval = setInterval(() => {
        calculateTimeLeft()
      }, 1000)
    }
    if (!props.flag) {
      clearInterval(interval)
    }
    return () => {
      return clearInterval(interval)
    }

    console.log('function mounts and re-rendered')
  }, [props.flag])

  return (
    <div className="time">
      <div>{/* <UseCountDown></UseCountDown> */}</div>
      {timeLeft.hours || timeLeft.minutes || timeLeft.seconds ? (
        <p>
          <span>
            {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
          </span>
          <span>:</span>
          <span>{timeLeft.minutes}</span>
          <span>:</span>
          <span>
            {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
          </span>
        </p>
      ) : (
        <p>{`${props.hour}:${props.minutes}:00`}</p>
      )}
    </div>
  )
}
export default React.memo(Input)
