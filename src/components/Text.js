import React from "react";

export default ({ el = "p", children, ...rest }) =>
  React.createElement(el, rest, children);
