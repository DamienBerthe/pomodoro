import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [switche, setSwitche] = useState(true);
  const [defaultS, setDefaultS] = useState(5);
  const [defaultB, setDefaultB] = useState(2);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setSeconds(5);
    setSwitche(true);
    setDefaultS(5);
    setDefaultB(2);
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
      Session : {defaultS}
      <button onClick={() => setDefaultS(defaultS + 1)}>+</button>
      <button onClick={() => setDefaultS(defaultS - 1)}>-</button>
      <br />
      Break : {defaultB}
      <button onClick={() => setDefaultB(defaultB + 1)}>+</button>
      <button onClick={() => setDefaultB(defaultB - 1)}>-</button>
      <br />
      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <br />
      {switche ? 'Session' : 'Break'} : {seconds}
    </div>
  );
}


export default App;
