import React from "react";

export default function Display(props) {
  const styles = props.pause ? "display--button" : " display--button pause";
  function updateDisplay() {
    let display;
    if (props.pause) {
      display = props.timeFormat(props.totalDuration, props.format);
    } else {
      display = props.timer;
    }
    return display;
  }

  return (
    <header className="display">
      <h3 className="display--title">Interval Timer</h3>
      <h1 className="display--duration">{updateDisplay()}</h1>
      <h1 className="display--info">{props.session}</h1>
      <button className={styles} onClick={props.toggleButton}></button>
      {/* <button className="display--button pause"></button> */}
    </header>
  );
}
