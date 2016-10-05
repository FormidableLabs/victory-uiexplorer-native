import React, { PropTypes } from "react";
import { View } from "react-native";
import VictoryAreaChartWrapper from "../components/victory-area-chart-wrapper";
import { defaultPropMap } from "../utils/props";
import { styles } from "../utils/styles";

const Example = ({ module: TargetComponent, selectedDatasetIndex = 0 }) => {
  const componentName = TargetComponent.displayName;
  const chartProps = defaultPropMap[componentName];
  const { data, ...otherProps } = chartProps;

  const customWrapper = customWrappers[componentName];
  const ComponentWrapper = customWrapper || View;
  const wrapperProps = customWrapper ? { style: styles.container } : {};

  return (
    <ComponentWrapper {...wrapperProps}>
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
