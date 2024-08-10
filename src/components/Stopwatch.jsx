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
    <div className="relative z-20 text-black align-center text-center bg-white w-[90%] md:w-[80%] lg:w-[60%] mx-auto rounded-bl-2xl rounded-br-2xl p-8">
      <div className="flex justify-between border-b pb-4 mb-4">
        <div className=''>
          <div className='text-2xl sm:text-6xl md:text-8xl font-bold'>{formattedTime.hours}</div>
          <div className="text-xxs sm:text-sm uppercase">Hour</div>
        </div>
        <div className='text-2xl sm:text-6xl md:text-8xl font-bold'>:</div>
        <div>
          <div className='text-2xl sm:text-6xl md:text-8xl font-bold'>{formattedTime.minutes}</div>
          <div className="text-xxs sm:text-sm uppercase">Minute</div>
        </div>
        <div className='text-2xl sm:text-6xl md:text-8xl font-bold'>:</div>
        <div>
          <div className='text-2xl sm:text-6xl md:text-8xl font-bold'>{formattedTime.seconds}</div>
          <div className="text-xxs sm:text-sm uppercase">Second</div>
        </div>
        <div className='text-2xl sm:text-6xl md:text-8xl font-bold'>:</div>
        <div>
          <div className='text-2xl sm:text-6xl md:text-8xl font-bold'>{formattedTime.milliseconds}</div>
          <div className="text-xxs sm:text-sm uppercase">Millisecond</div>
        </div>
      </div>
      <div className="flex justify-center gap-[20px] ">
        <button onClick={start} className="bg-gray-800 text-xxs sm:text-base text-white py-2 px-6 sm:px-12 font-bold">Start</button>
        <button onClick={stop} className="bg-gray-800 text-xxs sm:text-base text-white py-2 px-6 sm:px-12 font-bold">Stop</button>
        <button onClick={reset} className="bg-gray-800 text-xxs sm:text-base text-white py-2 px-6 sm:px-12 font-bold">Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
