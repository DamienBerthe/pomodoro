import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sessionSeconds, setSessionSeconds] = useState(10);
  const [breakSeconds, setBreakSeconds] =useState(10)
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setSessionSeconds(1500);
  }

  useEffect(() => {
    let interval = null;
    if (isActive && sessionSeconds !== 0) {
      interval = setInterval(() => {
        setSessionSeconds(sessionSeconds => sessionSeconds - 1);
      }, 1000);}
    else if (isActive && sessionSeconds === 0){
      interval = setInterval(() => {
        setBreakSeconds(breakSeconds => breakSeconds - 1);
      }, 1000);}
    
     else if (!isActive && sessionSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, sessionSeconds]);



  return (
    <div className="App">
      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      Session : {sessionSeconds}
      Break : {breakSeconds}
    </div>
  );
}


export default App;
