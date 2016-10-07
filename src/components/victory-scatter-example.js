import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
import { VictoryScatter } from "victory-native";
import { VictoryTransition } from "victory-core";
import ChartControls from "../components/chart-controls";
import ToggleControl from "../components/toggle-control";
import SliderControl from "../components/slider-control";
import Checkbox from "../components/checkbox";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";
import { colorScale, colorScales } from "../utils/colors";

const brights = colorScales[1];
const fills = [colorScale[2], brights[1], brights[2], brights[3]];
const symbols = ["circle", "star", "plus", "diamond"];
const labels = ["a", "b", "c", "d", "e", "f", "g"];
const toggleValues = ["Blue Gray", "Purple", "Pink", "Persimmon"];

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
    const selectedFill = fills[selectedFillIndex];

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryTransition animationWhitelist={["data", "style"]}>
            <VictoryScatter
              {...otherDefaultProps}
              animate={{ duration: 400 }}
              size={size}
              data={rawData[selectedDatasetIndex]}
              labels={showLabels ? labels : undefined}
              symbol={symbols[selectedSymbolIndex]}
              style={{
                data: {
                  fill: selectedFill,
                },
                labels: {
                  fill: selectedFill,
                  fontSize: Math.max(12, size * 2),
                  fontWeight: "600",
                  padding: size * 2,
                },
              }}
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
            onChange={this.handleSymbolChange}
            selectedIndex={selectedSymbolIndex}
            title="symbol"
            values={symbols}
          />
          <ToggleControl
            onChange={this.handleFillChange}
            selectedIndex={selectedFillIndex}
            title="fill"
            values={toggleValues}
          />
          <SliderControl
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
