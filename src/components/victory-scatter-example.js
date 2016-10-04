import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryScatter } from "victory-native";

import ChartControls from "../components/chart-controls";
import ToggleControl from "../components/toggle-control";
import { defaultPropMap } from "../utils/props";
import { colors } from "../utils/colors";

export default class VictoryScatterExample extends Component {
  static displayName = "VictoryScatterExample";

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
    const props = defaultPropMap.VictoryScatter;
    const { data, ...other } = props;

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryScatter
            animate={{ duration: 400 }}
            data={data[selectedDatasetIndex]}
            {...other}
          />
        </View>
        <ChartControls>
          <ToggleControl
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
