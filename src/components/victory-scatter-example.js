import React, { Component } from "react";
import { View } from "react-native";
import { VictoryScatter } from "victory-native";
import ChartControls from "../components/chart-controls";
import ToggleControl from "../components/toggle-control";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";

export default class VictoryScatterExample extends Component {
  static displayName = "VictoryScatterExample";

  constructor(props) {
    super(props);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.state = {
      selectedDatasetIndex: 0,
    };
  }

  render() {
    const { selectedDatasetIndex } = this.state;
    const defaultProps = defaultPropMap.VictoryScatter;
    const { data, ...otherDefaultProps } = defaultProps;

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryScatter
            {...otherDefaultProps}
            animate={{ duration: 400 }}
            data={data[selectedDatasetIndex]}
          />
        </View>
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
    this.setState({
      selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex,
    });
  }
}
