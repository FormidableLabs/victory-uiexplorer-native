import React, { PropTypes } from "react";
import { View } from "react-native";
import SegmentedControl from "./segmented-control";
import Title from "./title";
import { colorScale, colors } from "../utils/colors";

const Toggle = ({
  onChange = () => {},
  selectedIndex,
  title,
  values = ["Dataset 1", "Dataset 2", "Dataset 3"],
}) => (
  <View style={{ marginBottom: 20 }}>
    <Title text={title} style={{ marginBottom: 10 }} />
    <SegmentedControl
      onChange={onChange}
      selectedIndex={selectedIndex}
      style={{ height: 40 }}
      backgroundColor={colors.backgroundColor}
      tintColor={colorScale[1]}
      values={values}
    />
  </View>
);

Toggle.propTypes = {
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  title: PropTypes.string,
  values: PropTypes.array,
};

export default Toggle;
