import React, { PropTypes } from "react";
import { View } from "react-native";
import { shadowProps } from "../utils/props";
import { styles } from "../utils/styles";

const ChartWrapper = ({ children, dropShadow = false, ...otherProps }) => {
  let optionalProps = {};
  if (dropShadow) {
    optionalProps = shadowProps;
  }

  return (
    <View
      style={styles.chartWrapper}
      {...optionalProps}
      {...otherProps}
    >
      {children}
    </View>
  );
};

ChartWrapper.propTypes = {
  children: PropTypes.element,
  dropShadow: PropTypes.bool,
};

export default ChartWrapper;
