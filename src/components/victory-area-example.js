import React, { Component } from "react";
import { View } from "react-native";
import { VictoryArea, VictoryGroup, VictoryScatter } from "victory-native";

import VictoryAreaChartWrapper from "./victory-area-chart-wrapper";
import ChartControls from "./chart-controls";
import Toggle from "./toggle";
import Checkbox from "./checkbox";
import CallToAction from "./call-to-action";

import { colorScales, colorScaleToggleValues } from "../utils/colors";
import { dataLabels } from "../utils/data";
import { defaultPropMap, defaultDuration } from "../utils/props";
import { styles, minFontSize } from "../utils/styles";
import { sendScreenView } from "../utils/analytics";

const defaultProps = defaultPropMap.VictoryArea;
const { data, interpolation, style, ...otherDefaultProps } = defaultProps;

export default class VictoryAreaExample extends Component {
  static displayName = "VictoryAreaExample";

  constructor(props) {
    super(props);

    this.handleDataMarkerChange = this.handleDataMarkerChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleColorScaleChange = this.handleColorScaleChange.bind(this);

    this.state = {
      selectedColorScaleIndex: 0,
      selectedDatasetIndex: 0,
      showDataMarkers: false,
    };
  }

  componentDidMount() {
    sendScreenView("Area");
  }

  render() {
    const {
      selectedDatasetIndex,
      selectedColorScaleIndex,
      showDataMarkers,
    } = this.state;

    const selectedDataset = data[selectedDatasetIndex];
    const selectedColorScale = colorScales[selectedColorScaleIndex];
    const selectedFill = selectedColorScale[1];

    return (
      <View style={styles.container}>
        <VictoryAreaChartWrapper
          dropShadow
          colorScale={selectedColorScale}
        >
          <VictoryGroup
            {...otherDefaultProps}
            animate={defaultDuration}
            data={selectedDataset}
            standalone={false}
          >
            <VictoryArea
              interpolation={interpolation}
              style={style}
            />
            {showDataMarkers &&
              <VictoryScatter
                labels={dataLabels}
                size={4}
                style={{
                  data: {
                    fill: selectedFill,
                  },
                  labels: {
                    fill: selectedFill,
                    fontSize: minFontSize,
                    padding: 12,
                  },
                }}
              />
            }
          </VictoryGroup>
        </VictoryAreaChartWrapper>
        <ChartControls>
          <Toggle
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <Toggle
            onChange={this.handleColorScaleChange}
            selectedIndex={selectedColorScaleIndex}
            title="colorScale"
            values={colorScaleToggleValues}
          />
          <Checkbox
            label="Show data markers and labels"
            onChange={this.handleDataMarkerChange}
          />
          <CallToAction
            text="Learn more"
            url="https://formidable.com/open-source/victory/docs/victory-area"
            rounded
          />
        </ChartControls>
      </View>
    );
  }

  handleColorScaleChange(ev) {
    this.setState({ selectedColorScaleIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleDatasetChange(ev) {
    this.setState({ selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleDataMarkerChange() {
    this.setState({ showDataMarkers: !this.state.showDataMarkers });
  }
}
