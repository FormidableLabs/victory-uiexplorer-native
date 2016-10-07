import React, { Component } from "react";
import { View } from "react-native";
import { VictoryArea, VictoryGroup, VictoryScatter } from "victory-native";
import VictoryAreaChartWrapper from "./victory-area-chart-wrapper";
import ChartControls from "./chart-controls";
import ToggleControl from "./toggle-control";
import Checkbox from "./checkbox";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";
import { colorScales } from "../utils/colors";

export default class VictoryAreaExample extends Component {
  static displayName = "VictoryAreaExample";

  constructor(props) {
    super(props);
    this.handleDataMarkerChange = this.handleDataMarkerChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.state = {
      selectedDatasetIndex: 0,
      selectedColorIndex: 0,
      showDataMarkers: false,
    };
  }

  render() {
    const {
      selectedDatasetIndex,
      selectedColorIndex,
      showDataMarkers,
    } = this.state;

    const defaultProps = defaultPropMap.VictoryArea;
    const { data, interpolation, style, ...otherDefaultProps } = defaultProps;
    const selectedDataset = data[selectedDatasetIndex];
    const selectedColorScale = colorScales[selectedColorIndex];
    const selectedFill = selectedColorScale[1];

    return (
      <View style={styles.container}>
        <VictoryAreaChartWrapper colorScale={selectedColorScale}>
          <VictoryGroup
            {...otherDefaultProps}
            animate={{ duration: 400 }}
            data={selectedDataset}
            standalone={false}
          >
            <VictoryArea
              interpolation={interpolation}
              style={style}
            />
            {showDataMarkers &&
              <VictoryScatter
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
        </VictoryAreaChartWrapper>
        <ChartControls>
          <ToggleControl
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <ToggleControl
            onChange={this.handleColorChange}
            selectedIndex={selectedColorIndex}
            title="colorScale"
            values={["Blue Gray", "Bright", "Yellow"]}
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

  handleColorChange(ev) {
    this.setState({
      selectedColorIndex: ev.nativeEvent.selectedSegmentIndex,
    });
  }
}
