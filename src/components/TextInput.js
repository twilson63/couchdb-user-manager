import React from "react";
import uuid from "uuid/v4";

export default ({
  label,
  value,
  optional = false,
  onChangeText = noop,
  helperText = "",
  type = "text"
}) => {
  const id = uuid();
  const descId = uuid();
  return (
    <div className="measure">
      <label htmlFor={id} className="f6 b db mb2 fw4">
        {label}{" "}
        {optional && <span className="normal black-60">(optional)</span>}
      </label>
      <input
        id={id}
        className="input-reset ba b--black-20 pa2 mb2 db w-100"
        type={type}
        aria-describedby={descId}
        value={value}
        onChange={e => onChangeText(e.target.value)}
        autoComplete="false"
      />
      <small id={descId} className="f6 black-60 db mb2">
        {helperText}
      </small>
    </div>
  );
};

function noop() {
  return null;
}
