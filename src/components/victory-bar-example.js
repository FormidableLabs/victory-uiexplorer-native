import React, { Component } from "react";
import { View } from "react-native";
import { VictoryBar } from "victory-native";
import { VictoryTransition } from "victory-core";
import ChartControls from "./chart-controls";
import ToggleControl from "./toggle-control";
import SliderControl from "./slider-control";
import { defaultPropMap, shadowProps } from "../utils/props";
import { colorScales } from "../utils/colors";
import { styles } from "../utils/styles";

const orientations = ["vertical", "horizontal"];
const horizontalChartPadding = { top: 50, right: 80, bottom: 50, left: 80 };
const defaultProps = defaultPropMap.VictoryBar;
const { data, ...otherDefaultProps } = defaultProps;
delete otherDefaultProps.style;

export default class VictoryBarExample extends Component {
  static displayName = "VictoryBarExample";

  constructor(props) {
    super(props);

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.handleBarWidthChange = this.handleBarWidthChange.bind(this);

    this.state = {
      barWidth: 40,
      selectedColorIndex: 0,
      selectedDatasetIndex: 0,
      selectedOrientationIndex: 0,
    };
  }

  render() {
    const {
      barWidth,
      selectedColorIndex,
      selectedDatasetIndex,
      selectedOrientationIndex,
    } = this.state;

    const isHorizontal = orientations[selectedOrientationIndex] === "horizontal";
    const selectedColorScale = colorScales[selectedColorIndex];
    const dataWithSelectedColors = data[selectedDatasetIndex].map((d, i) => {
      d.fill = selectedColorScale[i];
      return d;
    });

    return (
      <View style={styles.container}>
        <View
          style={styles.chartWrapper}
          {...shadowProps}
        >
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
            min={5}
            max={60}
            onChange={this.handleBarWidthChange}
            title="barWidth"
            value={barWidth}
          />
          <ToggleControl
            onChange={this.handleOrientationChange}
            selectedIndex={selectedOrientationIndex}
            title="orientation"
            values={orientations}
          />
        </ChartControls>
      </View>
    );
  }

  handleColorChange(ev) {
    this.setState({ selectedColorIndex: ev.nativeEvent.selectedSegmentIndex });
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
