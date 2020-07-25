import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [switche, setSwitche] = useState(false);
  var defaultS = 5;
  var defaultB = 2;

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setSeconds(5);
  }


  useEffect(() => {
    if (switche){
      setSeconds(defaultS)
    }
    else{
      setSeconds(defaultB)
    }
  },[switche]);

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
  }, [isActive, seconds, isActive]);



  return (
    <div className="App">
      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      Session : {seconds}
      {//Break : {breakSeconds}
}
    </div>
  );
}


export default App;
