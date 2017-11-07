import React from "react";
import PropTypes from "prop-types";
import ChartWrapper from "./chart-wrapper";
import VictoryAreaChartWrapper from "./victory-area-chart-wrapper";
import { defaultPropMap } from "../utils/props";

const Example = ({ module: TargetComponent, selectedDatasetIndex = 0 }) => {
  const componentName = TargetComponent.displayName;
  const defaultProps = defaultPropMap[componentName];
  const { data, ...otherDefaultProps } = defaultProps;
  const customChartWrapper = customChartWrappers[componentName];
  const ComponentWrapper = customChartWrapper || ChartWrapper;

  return (
    <ComponentWrapper>
      <TargetComponent
        {...otherDefaultProps}
        data={data[selectedDatasetIndex]}
        standalone={!customChartWrapper}
      />
    </ComponentWrapper>
  );
};

const customChartWrappers = {
  VictoryArea: VictoryAreaChartWrapper,
};

Example.propTypes = {
  data: PropTypes.object,
  module: PropTypes.func,
  selectedDatasetIndex: PropTypes.number,
};

export default Example;
