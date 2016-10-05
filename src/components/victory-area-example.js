import React, { Component } from "react";
import { View } from "react-native";
import { VictoryArea } from "victory-native";
import ChartControls from "../components/chart-controls";
import DataToggle from "../components/toggle-control";
import VictoryAreaChartWrapper from "../components/victory-area-chart-wrapper";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";

export default class VictoryAreaExample extends Component {
  static displayName = "VictoryAreaExample";

  constructor(props) {
    super(props);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.state = {
      selectedDatasetIndex: 0,
    };
  }

  render() {
    const { selectedDatasetIndex } = this.state;
    const props = defaultPropMap.VictoryArea;
    const { data, ...other } = props;

    return (
      <View style={styles.container}>
        <VictoryAreaChartWrapper>
          <VictoryArea
            animate={{ duration: 400 }}
            data={data[selectedDatasetIndex]}
            standalone={false}
            {...other}
          />
        </VictoryAreaChartWrapper>
        <ChartControls>
          <DataToggle
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
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
}
