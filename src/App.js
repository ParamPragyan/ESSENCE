import './App.css'
import moment from 'moment'

import TenserFlowHandler from './components/TenserFlow/TenserFlowHandler'

import { useState, useRef } from 'react'

function App() {
  const [time, setTime] = useState(0)
  const [flag, setFlag] = useState(false)
  const hourInputRef = useRef(0)
  const minuteInputRef = useRef(0)
  const submitHandler = (e) => {
    e.preventDefault()

    setFlag((state) => {
      return !state
    })

    setTime(
      moment()
        .add(hourInputRef.current.value, 'hours')
        .add(minuteInputRef.current.value, 'minutes'),
    )
  }
  return (
    <div className="container">
      <div className="heading">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '2rem',
          }}
        >
          <h1 style={{ color: '#a2c3a4', fontSize: '3rem' }}>Essence</h1>
          <h2 style={{ color: '#a2c3a4', fontSize: '2rem', margin: '1rem' }}>
            {' '}
            Posture reflects your attitude
          </h2>
        </div>
        <p style={{ color: 'white' }}>Practice good posture</p>
      </div>
      <div className="wrapper">
        <div className="button-outer">
          <form onSubmit={submitHandler} className="buttons">
            {!flag && (
              <div className="inputContainer">
                <div className="hours">
                  <input
                    ref={hourInputRef}
                    type="text"
                    min={0}
                    max={24}
                    style={{
                      borderRadius: '10px',
                      border: '2px solid white',
                      fontSize: '1.6rem',
                      width: '8rem',
                      paddingLeft: '1rem',
                    }}
                  ></input>
                  <label style={{ color: 'white', fontSize: '2rem' }}>
                    {' '}
                    Hrs
                  </label>
                </div>
                <pre style={{ color: 'white', fontSize: '2rem' }}>:</pre>
                <div className="minutes">
                  <input
                    ref={minuteInputRef}
                    type="text"
                    min={0}
                    max={60}
                    style={{
                      borderRadius: '10px',
                      border: '2px solid white',
                      fontSize: '1.6rem',
                      width: '8rem',
                      paddingLeft: '1rem',
                    }}
                  ></input>

                  <label style={{ color: 'white', fontSize: '2rem' }}>
                    {' '}
                    Min
                  </label>
                </div>
              </div>
            )}
            <button style={{ marginBottom: '5rem' }} className="start">
              {flag ? 'Reset' : 'Start'}
            </button>
          </form>
        </div>
        <div>
          {flag && (
            <TenserFlowHandler
              hour={hourInputRef.current.value}
              minutes={minuteInputRef.current.value}
              time={time}
              submitHandler={submitHandler}
              flag={flag}
            ></TenserFlowHandler>
          )}
        </div>
      </div>
    </div>
  )
}
export default App
