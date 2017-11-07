import React from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet } from "react-native";

const ChartControls = ({ children }) => (
  <ScrollView contentContainerStyle={styles.container}>
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
