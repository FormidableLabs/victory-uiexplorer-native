import React, { PropTypes } from "react";
import { SegmentedControlIOS, View } from "react-native";
import Title from "../components/title";
import { colorScale } from "../utils/colors";

const ToggleControl = ({
  onChange = () => {},
  selectedIndex,
  title,
  values = ["Dataset 1", "Dataset 2", "Dataset 3"],
}) => (
  <View style={{ marginBottom: 20 }}>
    <Title text={title} style={{ marginBottom: 10 }} />
    <SegmentedControlIOS
      onChange={onChange}
      selectedIndex={selectedIndex}
      style={{ height: 40 }}
      tintColor={colorScale[1]}
      values={values}
    />
  </View>
);

ToggleControl.propTypes = {
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  title: PropTypes.string,
  values: PropTypes.array,
};

export default ToggleControl;
