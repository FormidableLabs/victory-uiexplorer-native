import React, { PropTypes } from "react";
import { StyleSheet, View } from "react-native";

import { defaultPropMap } from "../utils/props";
import { colors } from "../utils/colors";

const Example = ({ module: TargetComponent, selectedDatasetIndex = 0 }) => {
  const props = defaultPropMap[TargetComponent.displayName];
  const { data, ...other } = props;

  return (
    <View style={styles.container}>
      <TargetComponent
        data={data[selectedDatasetIndex]}
        {...other}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderBottomColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

Example.propTypes = {
  data: PropTypes.object,
  module: PropTypes.func,
  selectedDatasetIndex: PropTypes.number,
};

export default Example;
