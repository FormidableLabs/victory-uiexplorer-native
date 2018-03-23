import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import {
  VictoryPie,
  VictoryBar,
  VictoryArea,
  VictoryLine,
  VictoryScatter,
  VictoryCandlestick,
} from "victory-native";
import Example from "./example";
import Title from "./title";
import CallToAction from "./call-to-action";
import { colors } from "../utils/colors";
import { styles } from "../utils/styles";
import { sendScreenView } from "../utils/analytics";

const listData = [
  { key: "Pie Chart", component: VictoryPie },
  { key: "Bar Chart", component: VictoryBar },
  { key: "Line Chart", component: VictoryLine },
  { key: "Area Chart", component: VictoryArea },
  { key: "Scatter Chart", component: VictoryScatter },
  { key: "Candlestick Chart", component: VictoryCandlestick },
];

export default class ExampleList extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  componentDidMount() {
    sendScreenView("Home");
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={listData}
        ListFooterComponent={() => (
          <CallToAction
            text="Find out more"
            url="https://formidable.com/open-source/victory/"
            style={exampleListStyles.callToAction}
          />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={exampleListStyles.rowContainer}
            activeOpacity={0.8}
            onPress={() => navigate(`${item.component.displayName}Example`)}
          >
            <View style={exampleListStyles.titleContainer}>
              <Title text={item.key} />
              <View style={styles.caret} />
            </View>
            <View
              style={exampleListStyles.componentContainer}
              pointerEvents="none"
            >
              {React.createElement(Example, { module: item.component })}
            </View>
          </TouchableOpacity>
        )}
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
    justifyContent: "center",
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
    marginBottom: 15,
  },
});
