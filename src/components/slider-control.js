import React, { PropTypes } from "react";
import { Slider, View } from "react-native";
import Title from "../components/title";

const SliderControl = ({
  onChange = () => {},
  title,
  value = 0,
}) => (
  <View style={{ marginBottom: 20 }}>
    <Title text={title} style={{ marginBottom: 10 }} />
    <Slider
      minimumValue={0}
      maximumValue={100}
      onValueChange={onChange}
      step={1}
      value={value}
    />
  </View>
);

SliderControl.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.number,
};

export default SliderControl;
