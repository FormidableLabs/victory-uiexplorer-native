import React, { Component } from "react";
import { View } from "react-native";
import { VictoryArea, VictoryGroup, VictoryScatter } from "victory-native";
import ChartControls from "../components/chart-controls";
import ToggleControl from "../components/toggle-control";
import Checkbox from "../components/checkbox";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";
import { colorScale, colorScales } from "../utils/colors";

const brights = colorScales[1];
const xDomain = { x: [1.25, 4.75] };
const fills = [colorScale[2], brights[1], brights[2], brights[3]];

export default class VictoryAreaExample extends Component {
  static displayName = "VictoryAreaExample";

  constructor(props) {
    super(props);
    this.handleDataMarkerChange = this.handleDataMarkerChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleFillChange = this.handleFillChange.bind(this);
    this.state = {
      selectedDatasetIndex: 0,
      selectedFillIndex: 0,
      showDataMarkers: false,
    };
  }

  render() {
    const {
      selectedDatasetIndex,
      selectedFillIndex,
      showDataMarkers,
    } = this.state;
    const defaultProps = defaultPropMap.VictoryArea;
    const { data, ...otherDefaultProps } = defaultProps;
    const selectedDataset = data[selectedDatasetIndex];
    const selectedFill = fills[selectedFillIndex];

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryGroup animate={{ duration: 400 }}>
            <VictoryArea
              {...otherDefaultProps}
              data={selectedDataset}
              domain={xDomain}
              style={{
                data: {
                  fill: selectedFill,
                  opacity: 0.5,
                  stroke: "transparent",
                },
              }}
            />
            {showDataMarkers &&
              <VictoryScatter
                {...otherDefaultProps}
                data={selectedDataset}
                domain={xDomain}
                labels={["a", "b", "c", "d", "e"]}
                size={4}
                style={{
                  data: {
                    fill: selectedFill,
                  },
                  labels: {
                    fill: selectedFill,
                    fontSize: 12,
                    fontWeight: "600",
                    padding: 12,
                  },
                }}
              />
            }
          </VictoryGroup>
        </View>
        <ChartControls>
          <ToggleControl
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <ToggleControl
            onChange={this.handleFillChange}
            selectedIndex={selectedFillIndex}
            title="fill"
            values={["Blue Gray", "Purple", "Pink", "Persimmon"]}
          />
          <Checkbox
            label="Show data markers and labels"
            onChange={this.handleDataMarkerChange}
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

  handleDataMarkerChange() {
    this.setState({ showDataMarkers: !this.state.showDataMarkers });
  }

  handleFillChange(ev) {
    this.setState({
      selectedFillIndex: ev.nativeEvent.selectedSegmentIndex,
    });
  }
}
