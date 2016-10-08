import React, { Component } from "react";
import { View } from "react-native";
import { VictoryBar } from "victory-native";
import { VictoryTransition } from "victory-core";

import ChartControls from "./chart-controls";
import ChartWrapper from "./chart-wrapper";
import Toggle from "./toggle";
import Slider from "./slider";

import { defaultPropMap } from "../utils/props";
import { colorScales, colorScaleToggleValues } from "../utils/colors";
import { styles } from "../utils/styles";

const orientationToggleValues = ["Vertical", "Horizontal"];
const horizontalChartPadding = { top: 50, right: 80, bottom: 50, left: 80 };
const defaultProps = defaultPropMap.VictoryBar;
const { data, ...otherDefaultProps } = defaultProps;
delete otherDefaultProps.style;

export default class VictoryBarExample extends Component {
  static displayName = "VictoryBarExample";

  constructor(props) {
    super(props);

    this.handleColorScaleChange = this.handleColorScaleChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.handleBarWidthChange = this.handleBarWidthChange.bind(this);

    this.state = {
      barWidth: 40,
      selectedColorScaleIndex: 0,
      selectedDatasetIndex: 0,
      selectedOrientationIndex: 0,
    };
  }

  render() {
    const {
      barWidth,
      selectedColorScaleIndex,
      selectedDatasetIndex,
      selectedOrientationIndex,
    } = this.state;

    const isHorizontal = orientationToggleValues[selectedOrientationIndex] === "horizontal";
    const selectedColorScale = colorScales[selectedColorScaleIndex];
    const dataWithSelectedColors = data[selectedDatasetIndex].map((d, i) => {
      d.fill = selectedColorScale[i];
      return d;
    });

    return (
      <View style={styles.container}>
        <ChartWrapper dropShadow>
          <VictoryTransition animationWhitelist={["data"]}>
            <VictoryBar
              {...otherDefaultProps}
              animate={{
                duration: 400,
                onLoad: { duration: 0.0000001 },
              }}
              data={dataWithSelectedColors}
              horizontal={isHorizontal}
              padding={isHorizontal ? horizontalChartPadding : 30}
              style={{ data: { width: barWidth } }}
            />
          </VictoryTransition>
        </ChartWrapper>
        <ChartControls>
          <Toggle
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <Toggle
            onChange={this.handleColorScaleChange}
            selectedIndex={selectedColorScaleIndex}
            title="colorScale"
            values={colorScaleToggleValues}
          />
          <Slider
            min={5}
            max={60}
            onChange={this.handleBarWidthChange}
            title="barWidth"
            value={barWidth}
          />
          <Toggle
            onChange={this.handleOrientationChange}
            selectedIndex={selectedOrientationIndex}
            title="orientation"
            values={orientationToggleValues}
          />
        </ChartControls>
      </View>
    );
  }

  handleColorScaleChange(ev) {
    this.setState({ selectedColorScaleIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleDatasetChange(ev) {
    this.setState({ selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleOrientationChange(ev) {
    this.setState({ selectedOrientationIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleBarWidthChange(barWidth) {
    this.setState({ barWidth });
  }
}
