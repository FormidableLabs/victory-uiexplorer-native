import React, { Component } from "react";
import { View } from "react-native";
import { VictoryCandlestick } from "victory-native";

import ChartControls from "./chart-controls";
import ChartWrapper from "./chart-wrapper";
import Toggle from "./toggle";
import Checkbox from "./checkbox";

import { colorScales, colorScaleToggleValues } from "../utils/colors";
import { dataLabels } from "../utils/data";
import { defaultPropMap } from "../utils/props";
import { styles, minFontSize } from "../utils/styles";

const defaultProps = defaultPropMap.VictoryCandlestick;
const { data, style: defaultStyles, ...otherDefaultProps } = defaultProps;

export default class VictoryCandlestickExample extends Component {
  static displayName = "VictoryCandlestickExample";

  constructor(props) {
    super(props);

    this.handleColorScaleChange = this.handleColorScaleChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleLabelsChange = this.handleLabelsChange.bind(this);

    this.state = {
      selectedColorScaleIndex: 0,
      selectedDatasetIndex: 0,
      showLabels: false,
    };
  }

  render() {
    const {
      selectedColorScaleIndex,
      selectedDatasetIndex,
      showLabels,
    } = this.state;

    const selectedColorScale = colorScales[selectedColorScaleIndex];

    return (
      <View style={styles.container}>
        <ChartWrapper dropShadow>
          <VictoryCandlestick
            {...otherDefaultProps}
            animate={{
              duration: 400,
              onLoad: { duration: 0.0000001 },
            }}
            data={data[selectedDatasetIndex]}
            labels={showLabels ? dataLabels : undefined}
            style={selectedColorScaleIndex === 0 ? defaultStyles : {
              data: {
                fill: selectedColorScale[2],
                stroke: selectedColorScale[1],
              },
              labels: {
                fill: selectedColorScale[1],
                fontSize: minFontSize,
                padding: 6,
              },
            }}
          />
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
          <Checkbox
            label="Show labels"
            onChange={this.handleLabelsChange}
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

  handleLabelsChange() {
    this.setState({ showLabels: !this.state.showLabels });
  }
}
