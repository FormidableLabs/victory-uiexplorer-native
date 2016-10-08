import React, { Component } from "react";
import { View } from "react-native";
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native";
import ChartControls from "./chart-controls";
import ToggleControl from "./toggle-control";
import SliderControl from "./slider-control";
import Checkbox from "./checkbox";
import { defaultPropMap, defaultDuration, shadowProps } from "../utils/props";
import { styles } from "../utils/styles";
import { colorScale, colorScales } from "../utils/colors";

const brights = colorScales[1];
const strokeColors = [colorScale[3], brights[1], brights[2], brights[3]];
const dataLabels = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const toggleValues = ["Blue Gray", "Purple", "Pink", "Persimmon"];
const defaultProps = defaultPropMap.VictoryLine;
const { data, ...otherDefaultProps } = defaultProps;

export default class VictoryLineExample extends Component {
  static displayName = "VictoryLineExample";

  constructor(props) {
    super(props);

    this.handleDataLabelsChange = this.handleDataLabelsChange.bind(this);
    this.handleDataPointChange = this.handleDataPointChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleLineLabelChange = this.handleLineLabelChange.bind(this);
    this.handleStrokeColorChange = this.handleStrokeColorChange.bind(this);
    this.handleStrokeWidthChange = this.handleStrokeWidthChange.bind(this);

    this.state = {
      selectedDatasetIndex: 0,
      selectedStrokeColorIndex: 0,
      showDataLabels: false,
      showDataPoints: false,
      showLineLabel: false,
      strokeWidth: 2,
    };
  }

  render() {
    const {
      selectedStrokeColorIndex,
      selectedDatasetIndex,
      showDataLabels,
      showDataPoints,
      showLineLabel,
      strokeWidth,
    } = this.state;

    const strokeColor = strokeColors[selectedStrokeColorIndex];
    const selectedDataset = data[selectedDatasetIndex];
    const size = Math.max(3, strokeWidth * 1.3);

    return (
      <View style={styles.container}>
        <View
          style={styles.chartWrapper}
          {...shadowProps}
        >
          <VictoryGroup animate={defaultDuration}>
            <VictoryLine
              {...otherDefaultProps}
              data={selectedDataset}
              label={showLineLabel ? "LINE" : undefined}
              style={{
                data: {
                  stroke: strokeColors[selectedStrokeColorIndex],
                  strokeWidth,
                },
                labels: {
                  fill: strokeColor,
                  fontSize: Math.max(10, strokeWidth * 3),
                  fontWeight: "600",
                },
              }}
            />
            {showDataPoints &&
              <VictoryScatter
                data={selectedDataset}
                labels={showDataLabels ? dataLabels : undefined}
                size={size}
                style={{
                  data: {
                    fill: strokeColor,
                    stroke: "white",
                    strokeWidth: 2,
                  },
                  labels: {
                    fill: strokeColor,
                    fontSize: Math.max(12, size * 2),
                    fontWeight: "600",
                    padding: Math.max(8, size * 2),
                  },
                }}
              />
            }
          </VictoryGroup>
        </View>
        <ChartControls>
          <ToggleControl
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <ToggleControl
            onChange={this.handleStrokeColorChange}
            selectedIndex={selectedStrokeColorIndex}
            title="strokeColor"
            values={toggleValues}
          />
          <SliderControl
            min={1}
            max={8}
            onChange={this.handleStrokeWidthChange}
            title="strokeWidth"
            value={strokeWidth}
          />
          <Checkbox
            label="Show data points"
            onChange={this.handleDataPointChange}
          />
          <Checkbox
            label="Show line label"
            onChange={this.handleLineLabelChange}
          />
          <Checkbox
            label="Show data labels"
            onChange={this.handleDataLabelsChange}
          />
        </ChartControls>
      </View>
    );
  }

  handleDatasetChange(ev) {
    this.setState({ selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleStrokeColorChange(ev) {
    this.setState({ selectedStrokeColorIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleStrokeWidthChange(strokeWidth) {
    this.setState({ strokeWidth });
  }

  handleLineLabelChange() {
    this.setState({ showLineLabel: !this.state.showLineLabel });
  }

  handleDataPointChange() {
    this.setState({ showDataPoints: !this.state.showDataPoints });
  }

  handleDataLabelsChange() {
    this.setState({ showDataLabels: !this.state.showDataLabels });
  }
}
