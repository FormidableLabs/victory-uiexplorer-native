import React, { Component } from "react";
import { View } from "react-native";
import { VictoryBar } from "victory-native";
import { VictoryTransition } from "victory-core";
import ChartControls from "../components/chart-controls";
import ToggleControl from "../components/toggle-control";
import SliderControl from "../components/slider-control";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";

const orientations = ["vertical", "horizontal"];
const horizontalChartPadding = { top: 50, right: 80, bottom: 50, left: 80 };

export default class VictoryBarExample extends Component {
  static displayName = "VictoryBarExample";

  constructor(props) {
    super(props);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.handleBarWidthChange = this.handleBarWidthChange.bind(this);
    this.state = {
      barWidth: 40,
      selectedDatasetIndex: 0,
      selectedOrientationIndex: 0,
    };
  }

  render() {
    const { barWidth, selectedDatasetIndex, selectedOrientationIndex } = this.state;
    const defaultProps = defaultPropMap.VictoryBar;
    const { data, ...otherDefaultProps } = defaultProps;
    const isHorizontal = orientations[selectedOrientationIndex] === "horizontal";
    delete otherDefaultProps.style;

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryTransition animationWhitelist={["data"]}>
            <VictoryBar
              {...otherDefaultProps}
              animate={{ duration: 400 }}
              data={data[selectedDatasetIndex]}
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
            onChange={this.handleOrientationChange}
            selectedIndex={selectedOrientationIndex}
            title="orientation"
            values={orientations}
          />
          <SliderControl
            min={5}
            max={60}
            onChange={this.handleBarWidthChange}
            title="barWidth"
            value={barWidth}
          />
        </ChartControls>
      </View>
    );
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
