import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

/**
 * A SegmentedControlIOS-compatible, cross platform tab selection component
 */
export default class SegmentedControl extends Component {
  static displayName = "SegmentedControl";

  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    style: View.propTypes.style,
    tintColor: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    backgroundColor: "white",
    tintColor: "black",
    selectedIndex: 0,
  };

  renderOption(value, index) {
    const {
      tintColor,
      backgroundColor,
      selectedIndex,
      values,
      onChange,
    } = this.props;
    const isSelected = index === selectedIndex;
    const optionStyle = {
      borderColor: tintColor,
      backgroundColor: isSelected ? tintColor : backgroundColor,
    };
    const textColor = {
      color: isSelected ? backgroundColor : tintColor,
    };

    return (
      <TouchableOpacity
        key={`option-${value}`}
        activeOpacity={0.5}
        onPress={() => {
          // compatibile with SegmentedControlIOS.onChange event
          if (!isSelected) {
            onChange({ nativeEvent: { selectedSegmentIndex: index } });
          }
        }}
        style={[
          styles.option,
          index === 0 && styles.firstOption,
          index === (values.length - 1) && styles.lastOption,
          optionStyle,
        ]}
      >
        <Text style={[
          styles.optionText,
          textColor,
        ]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { style, values } = this.props;
    return (
      <View style={[styles.container, style]}>
        {values.map(this.renderOption.bind(this))}
      </View>
    );
  }
}

const BORDER_WIDTH = 1;
const BORDER_RADIUS = 5;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 40,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: BORDER_WIDTH,
    borderRightWidth: 0,
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    // hack around iOS border collapse behaviour, leaves
    // a blank space where the right border ought to be
    ...Platform.select({
      ios: {
        position: "relative",
        right: 1,
      },
    }),
  },
  firstOption: {
    // rounded corners only for iOS
    ...Platform.select({
      ios: {
        borderTopLeftRadius: BORDER_RADIUS,
        borderBottomLeftRadius: BORDER_RADIUS,
      },
    }),
  },
  lastOption: {
    borderRightWidth: BORDER_WIDTH,
    // rounded corners only for iOS
    ...Platform.select({
      ios: {
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
      },
    }),
  },
});
