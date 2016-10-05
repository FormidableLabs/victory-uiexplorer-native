import React, { PropTypes } from "react";
import { ScrollView, StyleSheet } from "react-native";

const ChartControls = ({ children }) => (
  <ScrollView style={styles.container}>
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingRight: 12,
    paddingBottom: 24,
    paddingLeft: 12,
  },
});

ChartControls.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};

export default ChartControls;
