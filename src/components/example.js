import React, { PropTypes } from "react";
import ChartWrapper from "./chart-wrapper";
import VictoryAreaChartWrapper from "./victory-area-chart-wrapper";
import { defaultPropMap } from "../utils/props";

const Example = ({ module: TargetComponent, selectedDatasetIndex = 0 }) => {
  const componentName = TargetComponent.displayName;
  const chartProps = defaultPropMap[componentName];
  const { data, ...otherProps } = chartProps;
  const customWrapper = customWrappers[componentName];
  const ComponentWrapper = customWrapper || ChartWrapper;

  return (
    <ComponentWrapper>
      <TargetComponent
        data={data[selectedDatasetIndex]}
        standalone={!customWrapper}
        {...otherProps}
      />
    </ComponentWrapper>
  );
};

const customWrappers = {
  VictoryArea: VictoryAreaChartWrapper,
};

Example.propTypes = {
  data: PropTypes.object,
  module: PropTypes.func,
  selectedDatasetIndex: PropTypes.number,
};

export default Example;
