import React, { Component } from "react";
import { View } from "react-native";
import { VictoryScatter } from "victory-native";
import { VictoryTransition } from "victory-core";
import _ from "lodash";

import ChartControls from "./chart-controls";
import ChartWrapper from "./chart-wrapper";
import Toggle from "./toggle";
import Slider from "./slider";
import Checkbox from "./checkbox";

import { solidColors, solidColorToggleValues } from "../utils/colors";
import { dataLabels } from "../utils/data";
import { defaultPropMap } from "../utils/props";
import { styles, minFontSize } from "../utils/styles";

const symbols = ["Circle", "Star", "Plus", "Diamond"];
const defaultProps = defaultPropMap.VictoryScatter;
const { data, ...otherDefaultProps } = defaultProps;
const rawData = [0, 1, 2].map((i) => {
  return data[i].map((o) => _.omit(o, ["fill", "symbol"]));
});

export default class VictoryScatterExample extends Component {
  static displayName = "VictoryScatterExample";

  constructor(props) {
    super(props);

    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleFillChange = this.handleFillChange.bind(this);
    this.handleLabelsChange = this.handleLabelsChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSymbolChange = this.handleSymbolChange.bind(this);

    this.state = {
      selectedDatasetIndex: 0,
      selectedFillIndex: 0,
      selectedSymbolIndex: 0,
      showLabels: false,
      size: 7,
    };
  }

  render() {
    const {
      selectedDatasetIndex,
      selectedFillIndex,
      selectedSymbolIndex,
      showLabels,
      size,
    } = this.state;
    const selectedFill = solidColors[selectedFillIndex];

    return (
      <View style={styles.container}>
        <ChartWrapper dropShadow>
          <VictoryTransition animationWhitelist={["data", "style"]}>
            <VictoryScatter
              {...otherDefaultProps}
              animate={{
                duration: 400,
                onLoad: { duration: 0.0000001 },
              }}
              size={size}
              data={rawData[selectedDatasetIndex]}
              labels={showLabels ? dataLabels : undefined}
              symbol={symbols[selectedSymbolIndex].toLowerCase()}
              style={{
                data: {
                  fill: selectedFill,
                },
                labels: {
                  fill: selectedFill,
                  fontSize: Math.max(minFontSize, size * 1.5),
                  padding: size * 2,
                },
              }}
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
            onChange={this.handleSymbolChange}
            selectedIndex={selectedSymbolIndex}
            title="symbol"
            values={symbols}
          />
          <Toggle
            onChange={this.handleFillChange}
            selectedIndex={selectedFillIndex}
            title="fill"
            values={solidColorToggleValues}
          />
          <Slider
            min={5}
            max={16}
            onChange={this.handleSizeChange}
            title="size"
            value={size}
          />
          <Checkbox
            label="Show labels"
            onChange={this.handleLabelsChange}
          />
        </ChartControls>
      </View>
    );
  }

  handleDatasetChange(ev) {
    this.setState({ selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleSizeChange(size) {
    this.setState({ size });
  }

  handleSymbolChange(ev) {
    this.setState({ selectedSymbolIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleFillChange(ev) {
    this.setState({ selectedFillIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleLabelsChange() {
    this.setState({ showLabels: !this.state.showLabels });
  }
}
