import React, { useEffect, useRef, useState } from 'react'
import '../styles/App.css';
const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [running, setRunning] = useState(false);
  const [isLap, setIsLap] = useState(false);

  useEffect(() => {
    let interval;
    if(running) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + .010);
      }, 10);
    }
    else if(!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  function handleLap() {
    setLaps([...laps, currentTime])
    setIsLap(true)
  }


  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{currentTime.toFixed(3)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={()=>{setRunning(true)}}>START</button>
          <button className="stop-btn" onClick={()=>{setRunning(false)}}>STOP</button>
          <button className="lap-btn" onClick={handleLap}>LAP</button>
          <button className="reset-btn" onClick={()=>{setRunning(false), setCurrentTime(0), setIsLap(false), setLaps([])}}>RESET</button>
        </section>
      </section>
      {isLap &&<section className='lap-section'>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((item)=> <p>{item.toFixed(3)}</p>)}
        </section>
      </section>}
    </div>
  )
}


export default App;
