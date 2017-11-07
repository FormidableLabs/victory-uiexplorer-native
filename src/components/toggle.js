import React from "react";
import PropTypes from "prop-types";
import { Platform, View, SegmentedControlIOS } from "react-native";
import SegmentedControl from "./segmented-control";
import Title from "./title";
import { colorScale, colors } from "../utils/colors";

// ideally we would use the cross-platform SegmentedControl
// for iOS and Android, but because of an obscure border rendering
// glitch on iOS, as a workaround let's use the compatible native
// implementation. See:
// https://github.com/FormidableLabs/victory-uiexplorer-native/issues/10
// https://github.com/facebook/react-native/issues/6082
const ToggleControl = Platform.OS === "ios"
  ? SegmentedControlIOS
  : SegmentedControl;

const Toggle = ({
  onChange = () => {},
  selectedIndex,
  title,
  values = ["Dataset 1", "Dataset 2", "Dataset 3"],
}) => (
  <View style={{ marginBottom: 20 }}>
    <Title text={title} style={{ marginBottom: 10 }} />
    <ToggleControl
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
