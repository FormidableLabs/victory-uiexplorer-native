
import GoogleAnalytics from "react-native-google-analytics-bridge";

GoogleAnalytics.setTrackerId("UA-43290258-3");

export const sendScreenView = function (screen) {
  try {
    GoogleAnalytics.trackScreenView(screen);
  } catch (e) {
    //eslint-disable-next-line no-console
    console.error(`Failed to send analytics screen view ${screen}`, e);
  }
};

export const sendEvent = function (category, action) {
  try {
    GoogleAnalytics.trackEvent(category, action);
  } catch (e) {
    //eslint-disable-next-line no-console
    console.error(`Failed to send analytics event ${category}/${action}`, e);
  }
};
