import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
import { showNotification } from '../notification'
import Webcam from 'react-webcam'
import Input from '../input/Input'
import moment from 'moment'
let interval
function TenserFlowHandler(props) {
  const webcRef = useRef(null)
  const firstTimeRef = useRef(true)
  const [Notificationflag, setNotificationflag] = useState(false)
  const [go, setgo] = useState(1)

  const intervalRef = useRef()
  // const canvRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 176, height: 144 },
      scale: 0.8,
    })
    console.log('runPoseNet ran again')
    intervalRef.current = setInterval(() => {
      console.log('detection started')
      detect(net)
    }, 20000)
  }
  async function detect(net) {
    if (
      typeof webcRef.current !== 'undefined' &&
      webcRef.current !== null &&
      webcRef.current.video.readyState === 4
    ) {
      const video = webcRef.current.video
      const videoWidth = webcRef.current.video.videoWidth
      const videoHeight = webcRef.current.video.videoHeight

      webcRef.current.video.width = videoWidth
      webcRef.current.video.height = videoHeight

      const pose = await net.estimateSinglePose(video)
      setgo(pose.score)
      console.log(go)
    }
  }

  const futureTime = useCallback(() => {
    console.log('future time ran')

    runPosenet()
    if (!props.flag) {
      console.log('clearing interval')
      intervalRef != null && clearInterval(intervalRef.current)
    }
  })

  useEffect(() => {
    console.log('firstTimeRef' + firstTimeRef.current)
    if (firstTimeRef.current) {
      console.log(firstTimeRef.current)
      futureTime()
      firstTimeRef.current = false
    }
    console.log('inside useEffect')
    if (!go || go > 0.4) return
    console.log('go: ', go)
    showNotification()
    console.log('rendered again')

    return () => {
      intervalRef != null && clearInterval(intervalRef.current)
    }
  }, [go])

  return (
    <div className="App">
      <header className="App-header">
        <Input
          intervalRef={intervalRef}
          date={props.time}
          flag={props.flag}
          onClick={futureTime}
          hour={props.hour}
          minutes={props.minutes}
        ></Input>

        <Webcam
          ref={webcRef}
          style={{
            position: 'absolute',
            // marginLeft: "0px",
            marginRight: '0px',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 176,
            height: 144,
            opacity: 0,
          }}
        />
      </header>
    </div>
  )
}

if (Notification.permission === 'granted') {
  showNotification()
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      showNotification()
    }
  })
}

/* <ReactAudioPlayer
  src="1663436351494-voicemaker.in-speech.mp3"
  autoPlay
  controls
/> */

//const x = new Audio("")

export default TenserFlowHandler
