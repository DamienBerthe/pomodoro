import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sessionSeconds, setSessionSeconds] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(5)
  const [isActiveS, setIsActiveS] = useState(false);
  const [isActiveB, setIsActiveB] = useState(false);

  function toggleS() {
    setIsActiveS(!isActiveS);
  }
/*
  function toggleB() {
    setIsActiveB(!isActiveB);
  }
*/
  function reset() {
    setIsActiveS(false);
    setIsActiveB(false);
    setSessionSeconds(5);
    setBreakSeconds(5);
  }

  useEffect(() => {
    let interval = null;
    if (isActiveS && sessionSeconds > -1) {
      interval = setInterval(() => {
        setSessionSeconds(sessionSeconds => sessionSeconds - 1);
      }, 1000);
    }
    else if (isActiveS && sessionSeconds === -1) {
      setIsActiveS(false);
      setSessionSeconds(5);
      setIsActiveB(true);
    }
    else if (isActiveB && breakSeconds > -1) {
      interval = setInterval(() => {
        setBreakSeconds(breakSeconds => breakSeconds - 1);
      }, 1000);
    }
    else if (isActiveB && breakSeconds === -1) {
      setIsActiveB(false);
      setBreakSeconds(5);
      setIsActiveS(true);
    }
    else if (!isActiveS && sessionSeconds !== 0) {
      clearInterval(interval);
    }
    else if (!isActiveB && breakSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActiveS, sessionSeconds, isActiveB, breakSeconds]);



  return (
    <div className="App">
      <button onClick={toggleS}>{isActiveS ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      Session : {sessionSeconds}
      Break : {breakSeconds}
    </div>
  );
}


export default App;
