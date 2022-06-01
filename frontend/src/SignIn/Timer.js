import React, { useState, useEffect, useRef } from "react";

function Timer() {
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    /* 타이머가 끝날 경우 이벤트 */
    if (time.current <= 0) {
      console.log("타임 아웃");
      clearInterval(timerId.current);
    }
  }, [sec]);

  return (
    <div>
      {min}:{sec}
    </div>
  );
}
export default Timer;
