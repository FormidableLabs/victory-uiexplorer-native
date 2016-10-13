import React, { Component } from "react";
import { View } from "react-native";
import { VictoryLine, VictoryGroup, VictoryScatter } from "victory-native";

import ChartControls from "./chart-controls";
import ChartWrapper from "./chart-wrapper";
import Toggle from "./toggle";
import Slider from "./slider";
import Checkbox from "./checkbox";
import CallToAction from "./call-to-action";

import { solidColors, solidColorToggleValues } from "../utils/colors";
import { dataLabels } from "../utils/data";
import { defaultPropMap, defaultDuration } from "../utils/props";
import { styles, minFontSize } from "../utils/styles";

const defaultProps = defaultPropMap.VictoryLine;
const { data, ...otherDefaultProps } = defaultProps;

export default class VictoryLineExample extends Component {
  static displayName = "VictoryLineExample";

  constructor(props) {
    super(props);

    this.handleDataMarkerChange = this.handleDataMarkerChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleLineLabelChange = this.handleLineLabelChange.bind(this);
    this.handleStrokeColorChange = this.handleStrokeColorChange.bind(this);
    this.handleStrokeWidthChange = this.handleStrokeWidthChange.bind(this);

    this.state = {
      selectedDatasetIndex: 0,
      selectedStrokeColorIndex: 0,
      showDataMarkers: false,
      showLineLabel: false,
      strokeWidth: 2,
    };
  }

  render() {
    const {
      selectedDatasetIndex,
      selectedStrokeColorIndex,
      showDataMarkers,
      showLineLabel,
      strokeWidth,
    } = this.state;

    const selectedStrokeColor = solidColors[selectedStrokeColorIndex];
    const selectedDataset = data[selectedDatasetIndex];
    const size = Math.max(3, strokeWidth * 1.3);

    return (
      <View style={styles.container}>
        <ChartWrapper dropShadow>
          <VictoryGroup animate={defaultDuration}>
            <VictoryLine
              {...otherDefaultProps}
              data={selectedDataset}
              label={showLineLabel ? "LINE" : undefined}
              style={{
                data: {
                  stroke: solidColors[selectedStrokeColorIndex],
                  strokeWidth,
                },
                labels: {
                  fill: selectedStrokeColor,
                  fontSize: Math.max(minFontSize, strokeWidth * 3),
                },
              }}
            />
            {showDataMarkers &&
              <VictoryScatter
                data={selectedDataset}
                labels={dataLabels}
                size={size}
                style={{
                  data: {
                    fill: selectedStrokeColor,
                    stroke: "white",
                    strokeWidth: 2,
                  },
                  labels: {
                    fill: selectedStrokeColor,
                    fontSize: Math.max(minFontSize, size * 2),
                    padding: Math.max(10, size * 2),
                  },
                }}
              />
            }
          </VictoryGroup>
        </ChartWrapper>
        <ChartControls>
          <Toggle
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <Toggle
            onChange={this.handleStrokeColorChange}
            selectedIndex={selectedStrokeColorIndex}
            title="strokeColor"
            values={solidColorToggleValues}
          />
          <Slider
            min={1}
            max={8}
            onChange={this.handleStrokeWidthChange}
            title="strokeWidth"
            value={strokeWidth}
          />
          <Checkbox
            label="Show data markers and labels"
            onChange={this.handleDataMarkerChange}
          />
          <Checkbox
            label="Show line label"
            onChange={this.handleLineLabelChange}
          />
          <CallToAction
            text="Learn more"
            url="https://formidable.com/open-source/victory/docs/victory-line"
            rounded
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

  handleDataMarkerChange() {
    this.setState({ showDataMarkers: !this.state.showDataMarkers });
  }
}
