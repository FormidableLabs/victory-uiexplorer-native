import React, { Component, PropTypes } from "react";
import { ListView, StyleSheet, TouchableOpacity, View } from "react-native";
import Example from "./example";
import Title from "./title";
import CallToAction from "./call-to-action";
import { colors } from "../utils/colors";
import { components, examples } from "../utils/examples";
import { styles } from "../utils/styles";
import { sendScreenView } from "../utils/analytics";

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
    this._renderFooter = this._renderFooter.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: ds.cloneWithRows(components.map((component) => {
        return React.createElement(Example, { module: component });
      })),
    };
  }

  componentDidMount() {
    sendScreenView("Home");
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
        renderFooter={this._renderFooter}
      />
    );
  }

  // eslint-disable-next-line max-params
  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity
        style={exampleListStyles.rowContainer}
        onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}
      >
        <View style={exampleListStyles.titleContainer}>
          <Title text={exampleTitles[rowID]} />
          <View style={styles.caret} />
        </View>
        <View style={exampleListStyles.componentContainer}>
          {rowData}
        </View>
      </TouchableOpacity>
    );
  }

  _renderFooter() {
    return (
      <CallToAction
        text="Find out more"
        url="https://formidable.com/open-source/victory/"
        style={exampleListStyles.callToAction}
      />
    );
  }
}

const exampleListStyles = StyleSheet.create({
  rowContainer: {
    marginTop: 32,
  },
  componentContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderTopColor: colors.borderColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 300,
    position: "relative",
  },
  titleContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 11,
    paddingBottom: 11,
  },
  callToAction: {
    marginLeft: 11,
    marginRight: 11,
    marginTop: 24,
    marginBottom: 11,
  },
});
