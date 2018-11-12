import React from "react";

export default ({
  el = "div",
  children,
  fontFamily = "avenir",
  align = "items-center justify-center",
  ...rest
}) => {
  const props = {
    className: `flex flex-column ${align} ${fontFamily}`,

    ...rest
  };

  return React.createElement(el, props, children);
};
