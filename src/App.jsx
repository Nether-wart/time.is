import dayjs from "dayjs";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const now = dayjs();
  const [nums, setNums] = useState([
    parseInt(now.hour() / 10),
    now.hour() % 10,
    parseInt(now.minute() / 10),
    now.minute() % 10,
    parseInt(now.second() / 10),
    now.second() % 10,
  ]);

  const wakeLockRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      const now = dayjs();
      setNums([
        parseInt(now.hour() / 10),
        now.hour() % 10,
        parseInt(now.minute() / 10),
        now.minute() % 10,
        parseInt(now.second() / 10),
        now.second() % 10,
      ]);
      document.title = `Time.is ${now.hour().toString().padStart(2, "0")}:${now.minute().toString().padStart(2, "0")}`;
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div
        className="title"
        onClick={() => {
          if (document.fullscreenElement !== null) {
            document.exitFullscreen();
          } else {
            navigator.wakeLock.request("screen").then((lock) => {
              wakeLockRef.current = lock;
            });
            document.documentElement.requestFullscreen();
          }
        }}
      >
        Time.is
      </div>

      <div className="clock-main">
        <div className="clock-inner">
          <span className="num">{nums[0]}</span>
          <span className="num">{nums[1]}</span>
          <span className="divide">:</span>
          <span className="num">{nums[2]}</span>
          <span className="num">{nums[3]}</span>
          <span className="divide">:</span>
          <span className="num">{nums[4]}</span>
          <span className="num">{nums[5]}</span>
        </div>
      </div>
    </>
  );
}

export default App;
