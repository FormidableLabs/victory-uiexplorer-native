import React, { Component } from "react";
import { View } from "react-native";
import { VictoryArea } from "victory-native";

import ChartControls from "../components/chart-controls";
import DataToggle from "../components/toggle-control";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";

export default class VictoryAreaExample extends Component {
  static displayName = "VictoryAreaExample";

  constructor(props) {
    super(props);

    this._handleToggleChange = this._handleToggleChange.bind(this);
    this.handleDatasetChange = this._handleToggleChange.bind(null, "selectedDatasetIndex");

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
        <View style={styles.chartWrapper}>
          <VictoryArea
            animate={{ duration: 400 }}
            data={data[selectedDatasetIndex]}
            {...other}
          />
        </View>
        <ChartControls>
          <DataToggle
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
          />
        </ChartControls>
      </View>
    );
  }

  _handleToggleChange(propName, ev) {
    const newState = {};
    newState[propName] = ev.nativeEvent.selectedSegmentIndex;
    this.setState(newState);
  }
}
