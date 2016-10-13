import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  chartWrapper: {
    backgroundColor: "white",
    borderBottomColor: colors.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  caret: {
    borderColor: "#AABBBF",
    borderRightWidth: 2,
    borderTopWidth: 2,
    height: 8,
    marginLeft: 7,
    transform: [{ rotate: "45deg" }],
    width: 8,
  },
});

export const minFontSize = 14;
