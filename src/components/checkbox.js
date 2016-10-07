import React, { PropTypes, Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { colors, colorScale } from "../utils/colors";

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultChecked: false,
  };

  constructor(props) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.handleCheckboxChange}
        activeOpacity={1}
        underlayColor="transparent"
      >
        <View style={styles.container}>
          <View style={styles.checkbox}>
            {this.state.checked &&
              <Svg height="18" width="18">
                <Polyline
                  fill="none"
                  stroke={colorScale[2]}
                  strokeWidth="2"
                  points="2,8 6,12 15,2"
                  strokeLinecap="round"
                />
              </Svg>
            }
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              {this.props.label}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  handleCheckboxChange(ev) {
    const { onChange } = this.props;
    this.setState({
      checked: !this.state.checked,
    });
    if (onChange) {
      onChange(ev);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: "white",
    borderColor: colorScale[2],
    borderRadius: 3,
    borderWidth: 1.5,
    height: 22,
    paddingTop: 2.5,
    paddingLeft: 1.5,
    width: 22,
  },
  labelContainer: {
    marginLeft: 10,
  },
  label: {
    color: colors.textColor,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
