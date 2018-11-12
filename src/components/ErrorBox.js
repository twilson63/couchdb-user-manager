import React from "react";

import View from "./View";
import Text from "./Text";

export default ({ msg }) => {
  return (
    <View
      el="div"
      className="ba br2 bw2 bg-light-red b--dark-red w-40 mv3 tc white ttu fw5"
    >
      <Text>{msg}</Text>
    </View>
  );
};
