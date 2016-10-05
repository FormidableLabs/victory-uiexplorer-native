import React, { PropTypes } from "react";
import { Slider, View } from "react-native";
import Title from "../components/title";

const SliderControl = ({
  max = 100,
  min = 0,
  onChange = () => {},
  title,
  value = 0,
}) => (
  <View style={{ marginBottom: 20 }}>
    <Title text={title} style={{ marginBottom: 10 }} />
    <Slider
      minimumValue={min}
      maximumValue={max}
      onValueChange={onChange}
      step={1}
      value={value}
    />
  </View>
);

SliderControl.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.number,
};

export default SliderControl;
