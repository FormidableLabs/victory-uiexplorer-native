import React, { Component } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import ExampleList from "./components/example-list";
import { routes } from "./utils/examples";
import { StackNavigator } from "react-navigation";
import { colors } from "./utils/colors";

const AppNavigator = StackNavigator({ // eslint-disable-line new-cap
  RootView: {
    screen: ExampleList,
    navigationOptions: { title: "Victory Native UIExplorer" },
  },
  ...routes,
}, {
  initialRouteName: "RootView",
  navigationOptions: {
    headerPressColorAndroid: "#6b8cb1",
    headerTintColor: colors.textColor,
  },
});

class VictoryNativeUIExplorer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default VictoryNativeUIExplorer;
