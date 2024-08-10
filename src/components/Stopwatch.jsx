import{ useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [counting, setCounting] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);


  const timeFormat = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };


  const start = () => {
    if (!counting) {
      setCounting(true);
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 1);
    }
  };

  const stop = () => {
    if (counting) {
      clearInterval(intervalRef.current);
      setCounting(false);
    }
  };


  const reset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setCounting(false);
  };


  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="stopwatch">
      <h2>{timeFormat(time)}</h2>
      <div>
      <p>Hour</p>
      <p>Minute</p>
      <p>Second</p>
      <p>Millisecond</p>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Stopwatch;
