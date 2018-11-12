import React from "react";

export default ({ bgColor = "black", color = "white", children, ...rest }) => {
  return (
    <button
      className={`ba br2 bg-${rest.disabled ? "light-gray" : bgColor} ${
        rest.disabled ? "black" : color
      } pv2 ${!rest.disabled ? "dim" : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};
