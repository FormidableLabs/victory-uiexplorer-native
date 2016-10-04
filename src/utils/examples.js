import {
  VictoryPie,
  VictoryBar,
  VictoryArea,
  VictoryLine,
  VictoryScatter,
  VictoryCandlestick,
} from "victory-native";

import VictoryPieExample from "../components/victory-pie-example";
import VictoryBarExample from "../components/victory-bar-example";
import VictoryLineExample from "../components/victory-line-example";
import VictoryAreaExample from "../components/victory-area-example";
import VictoryScatterExample from "../components/victory-scatter-example";
import VictoryCandlestickExample from "../components/victory-candlestick-example";

const components = [
  VictoryPie,
  VictoryBar,
  VictoryLine,
  VictoryArea,
  VictoryScatter,
  VictoryCandlestick,
];

const examples = [
  {
    component: VictoryPieExample,
    title: "<VictoryPie>",
  },
  {
    component: VictoryBarExample,
    title: "<VictoryBar>",
  },
  {
    component: VictoryLineExample,
    title: "<VictoryLine>",
  },
  {
    component: VictoryAreaExample,
    title: "<VictoryArea>",
  },
  {
    component: VictoryScatterExample,
    title: "<VictoryScatter>",
  },
  {
    component: VictoryCandlestickExample,
    title: "<VictoryCandlestick>",
  },
];

module.exports = {
  components,
  examples,
};
