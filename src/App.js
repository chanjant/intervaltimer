import React from "react";
import "./App.css";
import Display from "./Display";
import Slider from "./Slider";

function App() {
  const [settings, setSettings] = React.useState({
    work: 60,
    rest: 30,
    exercise: 5,
    round: 3,
    reset: 30,
  });

  const [pause, setPause] = React.useState(true);
  const [turn, setTurn] = React.useState("work");
  const [totalTurn, setTotalTurn] = React.useState(getCount());
  const [numOfTurn, setNumOfTurn] = React.useState(1);
  const [timer, setTimer] = React.useState(0);
  const [disableSlider, setDisableSlider] = React.useState(false);

  function getCount() {
    let workCount = settings.exercise * settings.round;
    let restCount = workCount;
    let resetCount = settings.round - 1;
    let totalCount = workCount + restCount + resetCount;
    return totalCount;
  }

  function updateState() {
    setTotalTurn((prevState) => prevState - 1);
    setNumOfTurn((prevState) => prevState + 1);
    let totalTurnPerRound = settings.exercise * 2 + 1;
    if (numOfTurn == totalTurnPerRound) {
      setTimer(settings.reset);
      setTurn("reset");
      setNumOfTurn(0);
    } else if (turn % 2 == 0) {
      setTimer(settings.rest);
      setTurn("rest");
    } else {
      setTimer(settings.work);
      setTurn("work");
    }
  }

  function countdown() {
    if (pause || totalTurn == 0) {
      return;
    } else if (timer > 0) {
      setTimer((prevTimer) => prevTimer - 1);
    } else if (timer == 0) {
      updateState();
    }
  }

  React.useEffect(() => {
    const startTimer = setInterval(() => countdown(), 1000);
    return () => clearInterval(startTimer);
  }, [timer]);

  React.useEffect(() => {
    if (!pause) {
      countdown();
    }
  }, [pause]);

  function handleChange(name, value) {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  }

  function totalDuration() {
    const work = Number(settings.work);
    const rest = Number(settings.rest);
    const exercise = Number(settings.exercise);
    const round = Number(settings.round);
    const reset = Number(settings.reset);
    const timePerExercise = work + rest;
    const timePerRound = timePerExercise * exercise + reset;
    const totalTime = timePerRound * round - reset;
    return totalTime;
  }

  const timeFormat = (input, format) => {
    let sec = input;
    let min = 0;
    let hr = 0;
    while (sec >= 60) {
      sec -= 60;
      min++;
    }
    while (min >= 60) {
      min -= 60;
      hr++;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min < 10) {
      min = `0${min}`;
    }
    if (hr < 10) {
      hr = `0${hr}`;
    }

    if (format === "hr") {
      return `${hr}:${min}:${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  };

  function toggleButton() {
    setPause((prevPause) => !prevPause);
    setDisableSlider(true);
  }

  return (
    <div>
      <Display
        totalDuration={totalDuration()}
        timeFormat={timeFormat}
        format="hr"
        toggleButton={toggleButton}
        pause={pause}
        timer={timer}
        session={turn}
      />
      <main className="settings">
        <Slider
          id="workRange"
          label="Work"
          defaultValue={settings.work}
          minValue="5"
          maxValue="180"
          isTime={true}
          handleChange={handleChange}
          name="work"
          timeFormat={timeFormat}
          disableSlider={disableSlider}
        />
        <Slider
          id="restRange"
          label="Rest"
          defaultValue={settings.rest}
          minValue="0"
          maxValue="60"
          isTime={true}
          handleChange={handleChange}
          name="rest"
          timeFormat={timeFormat}
          disableSlider={disableSlider}
        />
        <Slider
          id="exerciseRange"
          label="Exercises"
          defaultValue={settings.exercise}
          minValue="1"
          maxValue="20"
          isTime={false}
          handleChange={handleChange}
          name="exercise"
          timeFormat={timeFormat}
          disableSlider={disableSlider}
        />
        <Slider
          id="roundRange"
          label="Rounds"
          defaultValue={settings.round}
          minValue="1"
          maxValue="25"
          isTime={false}
          handleChange={handleChange}
          name="round"
          timeFormat={timeFormat}
          disableSlider={disableSlider}
        />
        <Slider
          id="resetRange"
          label="Round reset"
          defaultValue={settings.reset}
          minValue="0"
          maxValue="180"
          isTime={true}
          handleChange={handleChange}
          name="reset"
          timeFormat={timeFormat}
          disableSlider={disableSlider}
        />
      </main>
    </div>
  );
}

export default App;
