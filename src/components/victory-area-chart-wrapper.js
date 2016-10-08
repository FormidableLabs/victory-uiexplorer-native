import React, { Component, PropTypes } from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";
import { colorScale as defaultColorScale } from "../utils/colors";
import { styles } from "../utils/styles";

export default class VictoryAreaChartWrapper extends Component {
  static displayName = "VictoryAreaChartWrapper";

  static propTypes = {
    children: PropTypes.element,
    colorScale: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    colorScale: defaultColorScale,
  };

  render() {
    const { children, colorScale, ...otherProps } = this.props;

    return (
      <View
        style={styles.chartWrapper}
        {...otherProps}
      >
        <Svg height="300" width="375">
          <Defs>
            <LinearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={colorScale[1]} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={colorScale[3]} stopOpacity="0.4" />
            </LinearGradient>
          </Defs>
          {children}
        </Svg>
      </View>
    );
  }
}
