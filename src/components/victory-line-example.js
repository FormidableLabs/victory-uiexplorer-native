import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine } from "victory-native";

import ChartControls from "../components/chart-controls";
import DataToggle from "../components/toggle-control";
import { defaultPropMap } from "../utils/props";
import { colors } from "../utils/colors";

export default class VictoryLineExample extends Component {
  static displayName = "VictoryLineExample";

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
    const props = defaultPropMap.VictoryLine;
    const { data, ...other } = props;

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryLine
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    paddingTop: 64,
  },
  chartWrapper: {
    backgroundColor: "white",
    borderBottomColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
