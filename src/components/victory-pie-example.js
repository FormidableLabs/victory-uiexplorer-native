import React, { Component } from "react";
import { View } from "react-native";
import { VictoryPie } from "victory-native";
import ChartControls from "./chart-controls";
import ToggleControl from "./toggle-control";
import SliderControl from "./slider-control";
import { defaultPropMap } from "../utils/props";
import { colorScales } from "../utils/colors";
import { styles } from "../utils/styles";

export default class VictoryPieExample extends Component {
  static displayName = "VictoryPieExample";

  constructor(props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleInnerRadiusChange = this.handleInnerRadiusChange.bind(this);
    this.state = {
      innerRadius: 0,
      selectedColorIndex: 0,
      selectedDatasetIndex: 0,
    };
  }

  render() {
    const { innerRadius, selectedColorIndex, selectedDatasetIndex } = this.state;
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

  handleColorChange(ev) {
    this.setState({
      selectedColorIndex: ev.nativeEvent.selectedSegmentIndex,
    });
  }

  handleDatasetChange(ev) {
    this.setState({
      selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex,
    });
  }

  handleInnerRadiusChange(value) {
    this.setState({
      sliderValue: value,
    });
  }
}
