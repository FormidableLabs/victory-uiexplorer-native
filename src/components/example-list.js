/*eslint-disable max-params*/
import React, { Component, PropTypes } from "react";
import { ListView, StyleSheet, TouchableOpacity, View } from "react-native";

import Example from "../components/example";
import Title from "../components/title";

import { colors } from "../utils/colors";
import { components, examples } from "../utils/examples";
import { styles } from "../utils/styles";

const exampleTitles = [
  "PIE CHART",
  "BAR CHART",
  "LINE CHART",
  "AREA CHART",
  "SCATTER CHART",
  "CANDLESTICK CHART",
];

export default class ExampleList extends Component {
  static displayName = "ExampleList";

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._pressRow = this._pressRow.bind(this);
    this._renderRow = this._renderRow.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(components.map((component) => {
        return React.createElement(Example, { module: component });
      })),
    };
  }

  _pressRow(rowID) {
    const { component, title } = examples[rowID];
    this.props.navigator.push({
      key: component.displayName,
      component,
      title,
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity
        onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}
      >
        <View style={exampleListStyles.componentContainer}>
          <View style={exampleListStyles.titleContainer}>
            <Title text={exampleTitles[rowID]} />
            <View style={exampleListStyles.titleCaret} />
          </View>
          {rowData}
        </View>
      </TouchableOpacity>
    );
  }
}

const exampleListStyles = StyleSheet.create({
  componentContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopColor: colors.borderColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 300,
    marginTop: 48,
    position: "relative",
  },
  titleCaret: {
    borderColor: "#AABBBF",
    borderRightWidth: 2,
    borderTopWidth: 2,
    height: 8,
    marginLeft: 7,
    transform: [{ rotate: "45deg" }],
    width: 8,
  },
  titleContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 11,
    position: "absolute",
    top: -24,
  },
});
