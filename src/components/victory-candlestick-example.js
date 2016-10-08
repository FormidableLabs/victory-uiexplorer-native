import React, { Component } from "react";
import { View } from "react-native";
import { VictoryCandlestick } from "victory-native";

import ChartControls from "./chart-controls";
import ChartWrapper from "./chart-wrapper";
import Toggle from "./toggle";

import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";

const defaultProps = defaultPropMap.VictoryCandlestick;
const { data, ...otherDefaultProps } = defaultProps;

export default class VictoryCandlestickExample extends Component {
  static displayName = "VictoryCandlestickExample";

  constructor(props) {
    super(props);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.state = {
      selectedDatasetIndex: 0,
    };
  }

  render() {
    const { selectedDatasetIndex } = this.state;

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
          />
        </ChartWrapper>
        <ChartControls>
          <Toggle
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
        </ChartControls>
      </View>
    );
  }

  handleDatasetChange(ev) {
    this.setState({ selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex });
  }
}
