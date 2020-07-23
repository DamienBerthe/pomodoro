import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(300);
  return (
    <div className="App">
      {useEffect(() => {
        setInterval(() => {
          setSeconds(seconds => seconds - 1);
        }, 1000);
      }, [])
      }
      {seconds}
    </div>
  );
}

export default App;
