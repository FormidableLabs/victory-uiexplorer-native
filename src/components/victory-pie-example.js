import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";

import ChartControls from "./chart-controls";
import ToggleControl from "./toggle-control";
import SliderControl from "./slider-control";
import { defaultPropMap } from "../utils/props";
import { colors, colorScales } from "../utils/colors";

export default class VictoryPieExample extends Component {
  static displayName = "VictoryPieExample";

  constructor(props) {
    super(props);
    this._handleToggleChange = this._handleToggleChange.bind(this);
    this.handleColorChange = this._handleToggleChange.bind(null, "selectedColorIndex");
    this.handleDatasetChange = this._handleToggleChange.bind(null, "selectedDatasetIndex");
    this.handleInnerRadiusChange = this.handleInnerRadiusChange.bind(this);
    this.state = {
      selectedColorIndex: 0,
      selectedDatasetIndex: 0,
      innerRadius: 0,
    };
  }

  render() {
    const {
      selectedColorIndex,
      selectedDatasetIndex,
      innerRadius,
    } = this.state;

    const props = defaultPropMap.VictoryPie;
    const { data, ...other } = props;

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryPie
            {...other}
            animate={{ duration: 400 }}
            colorScale={colorScales[selectedColorIndex]}
            data={data[selectedDatasetIndex]}
            innerRadius={innerRadius}
          />
        </View>
        <ChartControls>
          <ToggleControl
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <ToggleControl
            onChange={this.handleColorChange}
            selectedIndex={selectedColorIndex}
            title="colorScale"
            values={["Blue Gray", "Bright", "Yellow"]}
          />
          <SliderControl
            onChange={this.handleInnerRadiusChange}
            title="innerRadius"
          />
        </ChartControls>
      </View>
    );
  }

  _handleToggleChange(propName, ev) {
    const newState = {};
    newState[propName] = ev.nativeEvent.selectedSegmentIndex;
    this.setState(newState);
  }

  handleInnerRadiusChange(value) {
    this.setState({ sliderValue: value });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    paddingTop: 64,
  },
  chartWrapper: {
    backgroundColor: "white",
    borderBottomColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
