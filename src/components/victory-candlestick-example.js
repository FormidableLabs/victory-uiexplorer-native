import React, { Component } from "react";
import { View } from "react-native";
import { VictoryCandlestick } from "victory-native";
import ChartControls from "./chart-controls";
import ChartWrapper from "./chart-wrapper";
import ToggleControl from "./toggle-control";
import { defaultPropMap, defaultDuration } from "../utils/props";
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
            animate={defaultDuration}
            data={data[selectedDatasetIndex]}
          />
        </ChartWrapper>
        <ChartControls>
          <ToggleControl
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
