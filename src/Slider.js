import React from "react";

export default function Slider(props) {
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
        disabled={props.disableSlider}
      />
    </div>
  );
}
