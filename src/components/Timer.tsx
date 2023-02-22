import { useEffect, useState } from "react";
import { ask } from "@tauri-apps/api/dialog";

interface Props {
  modal: boolean;
  handleModal: any;
}

export default function Timer({ modal, handleModal }: Props) {
  const [time, setTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);

  const buttons = [
    {
      value: 1800,
      display: "30m",
    },
    {
      value: 2700,
      display: "45m",
    },
    {
      value: 3600,
      display: "1h",
    },
  ];

  const toggleTimer = () => {
    setTimerStart(!timerStart);
  };

  const triggerResetDialog = async () => {
    let shouldReset = await ask("Do you want to reset timer?", {
      title: "Pomodoro Timer App",
      type: "warning",
    });
    if (shouldReset) {
      setTime(0);
      setTimerStart(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          ask("Congrats on completing a session!🎉", {
            title: `Time's up!`,
            type: "info",
          });
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerStart, time]);

  return (
    <>
      <p className="text-7xl text-white font-medium z-20">
        {`${
          Math.floor(time / 60) < 10
            ? `0${Math.floor(time / 60)}`
            : `${Math.floor(time / 60)}`
        }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
      </p>
      <div className="flex gap-2 h-12 mt-6">
        <button
          className="w-20 backdrop-blur-sm z-20 rounded-md border hover:bg-zinc-800 hover:text-white border-zinc-500 text-slate-400 transition-all duration-150"
          onClick={toggleTimer}
        >
          {!timerStart ? "Start" : "Pause"}
        </button>

        <button
          className="w-20 backdrop-blur-sm rounded-md z-20 border border-red-400 hover:bg-red-400/20 text-red-400 transition-all duration-150"
          onClick={triggerResetDialog}
        >
          Reset
        </button>
      </div>
      {modal ? (
        <div className="border border-zinc-400 bg-zinc-900/70 shadow-md duration-150 backdrop-blur-lg transition-all rounded-md z-30 p-4 absolute top-16 right-4 ">
          <div className="flex gap-2 ">
            {buttons.map(({ value, display }) => (
              <>
                {display == "1h" ? (
                  <button
                    className="rounded-full border border-orange-400 px-3 text-orange-400 hover:bg-orange-400/20 transition-all duration-150"
                    onClick={() => {
                      setTimerStart(false);
                      setTime(value);
                      handleModal((prev) => !prev);
                    }}
                  >
                    {display}
                  </button>
                ) : (
                  <button
                    className="rounded-full border border-zinc-100 p-2 text-zinc-100 hover:bg-zinc-400/20 transition-all duration-150 "
                    onClick={() => {
                      setTimerStart(false);
                      setTime(value);
                      handleModal((prev) => !prev);
                    }}
                  >
                    {display}
                  </button>
                )}
              </>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
