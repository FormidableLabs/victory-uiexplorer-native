import React, { Component } from "react";
import { View } from "react-native";
import { VictoryBar } from "victory-native";

import ChartControls from "../components/chart-controls";
import DataToggle from "../components/toggle-control";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";

export default class VictoryBarExample extends Component {
  static displayName = "VictoryBarExample";

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
    const props = defaultPropMap.VictoryBar;
    const { data, ...other } = props;

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryBar
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
