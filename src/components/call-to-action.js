import React from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import { colorScale } from "../utils/colors";
import { styles } from "../utils/styles";
import { sendEvent } from "../utils/analytics";

const createUrlHandler = (url) => () => {
  sendEvent("CallToAction", url);
  Linking.openURL(url);
};

const CallToAction = ({ text, url, style, rounded }) => (
  <View style={style}>
    <TouchableOpacity
      onPress={createUrlHandler(url)}
      style={[componentStyles.touchable, rounded && componentStyles.rounded]}
    >
      <Text style={componentStyles.text}>{text.toUpperCase()}</Text>
      <View style={[styles.caret, { borderColor: "white" }]} />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={createUrlHandler("https://formidable.com/")}
      style={[componentStyles.brandTouchable]}
    >
      <Image
        style={componentStyles.logo}
        source={require("../../images/logo.png")}
      />
    </TouchableOpacity>
  </View>
);

CallToAction.propTypes = {
  rounded: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const componentStyles = StyleSheet.create({
  touchable: {
    backgroundColor: colorScale[1],
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    height: 40,
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  rounded: {
    borderRadius: Platform.OS === "ios" ? 5 : 0,
  },
  brandTouchable: {
    height: 40,
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  logo: {
    height: 40,
    width: 120,
    resizeMode: "contain",
  },
});

export default CallToAction;
