import React, { PropTypes } from "react";
import { Slider as RNSlider, View } from "react-native";
import Title from "./title";

const Slider = ({
  max = 100,
  min = 0,
  onChange = () => {},
  title,
  value = 0,
}) => (
  <View style={{ marginBottom: 20 }}>
    <Title text={title} style={{ marginBottom: 10 }} />
    <RNSlider
      minimumValue={min}
      maximumValue={max}
      onValueChange={onChange}
      step={1}
      value={value}
    />
  </View>
);

Slider.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.number,
};

export default Slider;
