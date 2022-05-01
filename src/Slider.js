import React from "react";

export default function Slider(props) {
  // const timeFormat = (input) => {
  //   let sec = input;
  //   let min = 0;
  //   while (sec >= 60) {
  //     sec -= 60;
  //     min++;
  //   }
  //   if (sec < 10) {
  //     sec = `0${sec}`;
  //   }
  //   if (min < 10) {
  //     min = `0${min}`;
  //   }
  //   return `${min}:${sec}`;
  // };
  return (
    <div className="settings--containers">
      <div className="settings--label">
        <h4 className="settings--name">{props.label}</h4>
        <span id="workValue" className="settings--value">
          {props.isTime
            ? props.timeFormat(props.defaultValue, props.name)
            : props.defaultValue}
        </span>
      </div>
      <input
        id={props.id}
        className="settings--slider"
        type="range"
        defaultValue={props.defaultValue}
        min={props.minValue}
        max={props.maxValue}
        onChange={(e) => props.handleChange(props.name, e.target.value)}
      />
    </div>
  );
}
