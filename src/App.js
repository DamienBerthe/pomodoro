import React, { useState, useEffect } from 'react';
import './App.css';

/*let sound = new Audio('/sound.mp3')
sound.volume = 1
sound.id ='beep'*/

/*{<audio id="beep">
    <source src="/sound.mp3" type="audio/mpeg" />
</audio>}*/

//var sound = document.getElementById("beep");



function App() {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [switche, setSwitche] = useState(true);
  const [defaultS, setDefaultS] = useState(1500);
  const [defaultB, setDefaultB] = useState(300);
  

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setSeconds(1500);
    setSwitche(true);
    setDefaultS(1500);
    setDefaultB(300);
    //sound.pause();
    //sound.currentTime = 0;
    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime = 0;
  }

  function toMinutes(kek) {
    let minutes = Math.floor(kek / 60);
    let seconds = kek % 60;
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return minutes + ':' + seconds
  }

  useEffect(() => {
    if (switche) {
      setSeconds(defaultS)
    }
    else {
      setSeconds(defaultB)
    }
  }, [switche, defaultS, defaultB]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > -1) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      if (seconds === 0) {
        //sound.play()
        setSwitche(!switche);
        document.getElementById('beep').play()
      }
    }
    else if (seconds === -1) {
      //setSwitche(!switche);
    }
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, seconds]);

  return (
    <div className="App">
      <audio src='/sound.mp3' id='beep'/>
      <div id="session-label">
        Session Length:
      </div>
      <div id="session-length">
        {Math.floor(defaultS / 60)}
      </div>

      <button id="session-increment" onClick={() => { if (defaultS <= 3540 && !isActive) { setDefaultS(defaultS + 60) } }}>+</button>
      <button id="session-decrement" onClick={() => { if (defaultS >= 120 && !isActive) { setDefaultS(defaultS - 60) } }}>-</button>

      <br />
      <div id="break-label">
        Break Length:
      </div>
      <div id="break-length">
        {Math.floor(defaultB / 60)}
      </div>

      <button id="break-increment" onClick={() => { if (defaultB <= 3540 && !isActive) { setDefaultB(defaultB + 60) } }}>+</button>
      <button id="break-decrement" onClick={() => { if (defaultB >= 120 && !isActive) { setDefaultB(defaultB - 60) } }}>-</button>


      <br />
      <button id="start_stop" onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button id="reset" onClick={reset}>Reset</button>
      <br />
      <div id="timer-label">
        {switche ? 'Session' : 'Break'} :
      </div>
      <div id="time-left">
        {toMinutes(seconds)}
      </div>
    </div>
  );
}


export default App;
