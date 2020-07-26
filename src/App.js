import React, { useState, useEffect } from 'react';
import './App.css';

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
  }

  function toMinutes(kek){
    let minutes = Math.floor(kek/60);
    let seconds = kek%60;
    if(minutes<10) {
      minutes = '0'+ minutes
    } 
    if(seconds<10){
      seconds ='0' + seconds
    }
    return minutes + ':' +seconds
  }

  useEffect(() => {
    if (switche){
      setSeconds(defaultS)
    }
    else{
      setSeconds(defaultB)
    }
  },[switche, defaultS, defaultB]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > -1) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    else if (seconds === -1) {
      setSwitche(!switche);
    }
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, seconds]);



  return (
    <div className="App">
      Session : {toMinutes(defaultS)}
      <button onClick={() => {if(defaultS<=3540 && !isActive){setDefaultS(defaultS + 60)}}}>+</button>
      <button onClick={() => {if(defaultS>=120 && ! isActive){setDefaultS(defaultS - 60)}}}>-</button>
      <br />
      Break : {toMinutes(defaultB)}
      <button onClick={() => {if(defaultB<=3540 && !isActive){setDefaultB(defaultB + 60)}}}>+</button>
      <button onClick={() => {if(defaultB>=120 && ! isActive){setDefaultB(defaultB - 60)}}}>-</button>
      <br />
      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <br />
      {switche ? 'Session' : 'Break'} : {toMinutes(seconds)}
    </div>
  );
}


export default App;
