import React, { Component } from "react";
import { View } from "react-native";
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native";
import ChartControls from "../components/chart-controls";
import ToggleControl from "../components/toggle-control";
import SliderControl from "../components/slider-control";
import Checkbox from "../components/checkbox";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";
import { colorScales } from "../utils/colors";

const brights = colorScales[1];
const strokeColors = [colorScales[0][3], brights[1], brights[2], brights[3]];

export default class VictoryLineExample extends Component {
  static displayName = "VictoryLineExample";

  constructor(props) {
    super(props);

    this.handleDataPointChange = this.handleDataPointChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleLineLabelChange = this.handleLineLabelChange.bind(this);
    this.handleStrokeColorChange = this.handleStrokeColorChange.bind(this);
    this.handleStrokeWidthChange = this.handleStrokeWidthChange.bind(this);

    this.state = {
      showDataPoints: false,
      showLineLabel: false,
      selectedStrokeColorIndex: 0,
      selectedDatasetIndex: 0,
      strokeWidth: 2,
    };
  }

  render() {
    const {
      selectedStrokeColorIndex,
      selectedDatasetIndex,
      showLineLabel,
      showDataPoints,
      strokeWidth,
    } = this.state;
    const defaultProps = defaultPropMap.VictoryLine;
    const { data, ...otherDefaultProps } = defaultProps;
    const strokeColor = strokeColors[selectedStrokeColorIndex];
    const selectedDataset = data[selectedDatasetIndex];

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryGroup>
            <VictoryLine
              {...otherDefaultProps}
              animate={{ duration: 400 }}
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
                animate={{ duration: 400 }}
                data={selectedDataset}
                size={Math.max(3, strokeWidth * 1.3)}
                style={{
                  data: {
                    fill: strokeColor,
                    stroke: "white",
                    strokeWidth: 2,
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
            values={["Blue Gray", "Purple", "Pink", "Persimmon"]}
          />
          <SliderControl
            min={1}
            max={10}
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
        </ChartControls>
      </View>
    );
  }

  handleDatasetChange(ev) {
    this.setState({
      selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex,
    });
  }

  handleStrokeColorChange(ev) {
    this.setState({
      selectedStrokeColorIndex: ev.nativeEvent.selectedSegmentIndex,
    });
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
}
