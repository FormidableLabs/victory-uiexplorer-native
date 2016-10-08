import React, { Component } from "react";
import { View } from "react-native";
import { VictoryPie } from "victory-native";
import { VictoryTransition } from "victory-core";
import ChartControls from "./chart-controls";
import ChartWrapper from "./chart-wrapper";
import ToggleControl from "./toggle-control";
import SliderControl from "./slider-control";
import { defaultPropMap, defaultDuration } from "../utils/props";
import { colorScales } from "../utils/colors";
import { styles } from "../utils/styles";

const endAngles = ["-180", "-135", "-90"];
const startAngles = ["180", "135", "90"];
const defaultProps = defaultPropMap.VictoryPie;
const { data, ...otherDefaultProps } = defaultProps;
const animationWhitelist = ["colorScale", "data", "endAngle", "startAngle"];
const colorScaleToggleValues = ["Blue Gray", "Bright", "Yellow"];

export default class VictoryPieExample extends Component {
  static displayName = "VictoryPieExample";

  constructor(props) {
    super(props);

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleInnerRadiusChange = this.handleInnerRadiusChange.bind(this);
    this.handleEndAngleChange = this.handleEndAngleChange.bind(this);
    this.handlePadAngleChange = this.handlePadAngleChange.bind(this);
    this.handleStartAngleChange = this.handleStartAngleChange.bind(this);

    this.state = {
      innerRadius: 0,
      padAngle: 0,
      selectedColorIndex: 0,
      selectedDatasetIndex: 0,
      selectedEndAngleIndex: 0,
      selectedStartAngleIndex: 0,
    };
  }

  render() {
    const {
      innerRadius,
      padAngle,
      selectedColorIndex,
      selectedDatasetIndex,
      selectedEndAngleIndex,
      selectedStartAngleIndex,
    } = this.state;

    return (
      <View style={styles.container}>
        <ChartWrapper dropShadow>
          <VictoryTransition animationWhitelist={animationWhitelist}>
            <VictoryPie
              {...otherDefaultProps}
              animate={defaultDuration}
              colorScale={colorScales[selectedColorIndex]}
              data={data[selectedDatasetIndex]}
              innerRadius={innerRadius}
              startAngle={parseInt(startAngles[selectedStartAngleIndex])}
              endAngle={parseInt(endAngles[selectedEndAngleIndex])}
              padAngle={padAngle}
            />
          </VictoryTransition>
        </ChartWrapper>
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
            values={colorScaleToggleValues}
          />
          <SliderControl
            onChange={this.handleInnerRadiusChange}
            title="innerRadius"
            value={innerRadius}
          />
          <SliderControl
            min={0}
            max={10}
            onChange={this.handlePadAngleChange}
            title="padAngle"
            value={padAngle}
          />
          <ToggleControl
            onChange={this.handleStartAngleChange}
            selectedIndex={selectedStartAngleIndex}
            title="startAngle"
            values={startAngles}
          />
          <ToggleControl
            onChange={this.handleEndAngleChange}
            selectedIndex={selectedEndAngleIndex}
            title="endAngle"
            values={endAngles}
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

  handleEndAngleChange(ev) {
    this.setState({ selectedEndAngleIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleInnerRadiusChange(innerRadius) {
    this.setState({ innerRadius });
  }

  handlePadAngleChange(padAngle) {
    this.setState({ padAngle });
  }

  handleStartAngleChange(ev) {
    this.setState({ selectedStartAngleIndex: ev.nativeEvent.selectedSegmentIndex });
  }
}
