import { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [counting, setCounting] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const timeFormat = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      milliseconds: String(milliseconds).padStart(2, '0'),
    };
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

  const formattedTime = timeFormat(time);

  return (
    <div className="relative z-20 text-black align-center text-center bg-white w-[90%] md:w-[70%] lg:w-[50%] mx-auto rounded-bl-2xl rounded-br-2xl p-8">
      <div className="grid grid-cols-4 gap-4 text-4xl font-bold">
        <div>
          <div>{formattedTime.hours}</div>
          <div className="text-sm">Hour</div>
        </div>
        <div>
          <div>{formattedTime.minutes}</div>
          <div className="text-sm">Minute</div>
        </div>
        <div>
          <div>{formattedTime.seconds}</div>
          <div className="text-sm">Second</div>
        </div>
        <div>
          <div>{formattedTime.milliseconds}</div>
          <div className="text-sm">Millisecond</div>
        </div>
      </div>
      <div className="mt-8 space-x-4">
        <button onClick={start} className="">Start</button>
        <button onClick={stop} className="">Stop</button>
        <button onClick={reset} className="">Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
