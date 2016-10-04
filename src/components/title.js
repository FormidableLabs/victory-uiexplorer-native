import React, { PropTypes } from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../utils/colors";

const Title = ({ style, text }) => (
  <Text style={[styles.text, style && style]}>{text}</Text>
);

const styles = StyleSheet.create({
  text: {
    backgroundColor: "transparent",
    color: colors.textColor,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});

Title.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
};

export default Title;
