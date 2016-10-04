import React, { PropTypes } from "react";
import { View } from "react-native";

const ChartControls = ({ children }) => (
  <View style={{ padding: 12 }}>
    {children}
  </View>
);

ChartControls.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};

export default ChartControls;
