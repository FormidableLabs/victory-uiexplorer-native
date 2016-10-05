import React, { Component, PropTypes } from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient, Stop } from "react-native-svg";
import { colorScale } from "../utils/colors";
import { styles } from "../utils/styles";

export default class VictoryAreaChartWrapper extends Component {
  static displayName = "VictoryAreaChartWrapper";

  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    return (
      <View style={styles.container}>
        <Svg height="300" width="375">
          <Defs>
            <LinearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={colorScale[1]} stopOpacity="1" />
              <Stop offset="100%" stopColor={colorScale[3]} stopOpacity="0.5" />
            </LinearGradient>
          </Defs>
          {this.props.children}
        </Svg>
      </View>
    );
  }
}
