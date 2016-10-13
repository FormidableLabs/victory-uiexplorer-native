import React, { Component, PropTypes } from "react";
import { NavigationExperimental, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

export default class Navigator extends Component {
  static propTypes = {
    initialRoute: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._navigate = this._navigate.bind(this);
    this.handleBack = this._navigate.bind(null, "pop");
    this._renderHeader = this._renderHeader.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._renderBackButtonComponent = this._renderBackButtonComponent.bind(this);

    this.navigator = {
      push: this._navigate.bind(null, "push"),
      pop: this._navigate.bind(null, "pop"),
    };

    this.state = {
      navigationState: {
        index: 0,
        routes: [props.initialRoute],
      },
    };
  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.navigationState}
        style={styles.navigator}
        renderHeader={this._renderHeader}
        renderScene={this._renderScene}
        onNavigateBack={this.handleBack}
      />
    );
  }

  _navigate(type, route) {
    let { navigationState } = this.state;
    if (route && navigationState.routes[navigationState.index].key === route.key) {
      return;
    }
    switch (type) {
    case "push":
      navigationState = NavigationStateUtils.push(navigationState, route);
      break;
    case "pop":
      navigationState = NavigationStateUtils.pop(navigationState);
      break;
    }
    this.setState({ navigationState });
  }

  _renderHeader(props) {
    return (
      <NavigationHeader
        {...props}
        onNavigateBack={this.handleBack}
        renderTitleComponent={this._renderTitleComponent}
        renderLeftComponent={this._renderBackButtonComponent}
        style={styles.navHeader}
      />
    );
  }

  _renderBackButtonComponent(props) {
    if (props.scene.index === 0) { return null; }

    return (
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={this.handleBack}
      >
        <View style={styles.backButton} />
      </TouchableOpacity>
    );
  }

  _renderTitleComponent(props) {
    return (
      <NavigationHeader.Title textStyle={styles.navHeaderText}>
        {props.scene.route.title}
      </NavigationHeader.Title>
    );
  }

  _renderScene(props) {
    const TargetComponent = props.scene.route.component;
    return <TargetComponent navigator={this.navigator} />;
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  navHeader: {
    backgroundColor: "white",
    borderBottomColor: colors.borderColor,
  },
  navHeaderText: {
    color: colors.textColor,
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  backButton: {
    borderColor: "#6B8CB1",
    borderLeftWidth: 2,
    borderTopWidth: 2,
    height: 11,
    margin: 16,
    transform: [{ rotate: "-45deg" }],
    width: 11,
  },
  backButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
