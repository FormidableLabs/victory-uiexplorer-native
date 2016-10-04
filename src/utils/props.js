import { datasets } from "./datasets";
import { colorScale } from "./colors";

const height = 300;
const padding = {
  top: 38,
  right: 36,
  bottom: 38,
  left: 36,
};

export const defaultPropMap = {
  VictoryPie: {
    style: {
      labels: {
        fill: "none",
        stroke: "transparent",
      },
    },
    height,
    padding: {
      top: 30,
      bottom: 30,
      left: 64,
    },
    colorScale,
    data: datasets.pie,
  },
  VictoryBar: {
    data: datasets.bar,
    domain: { x: [0.75, 4.25] },
    height,
    padding,
    style: {
      data: {
        fill: colorScale[3],
        width: 40,
      },
    },
  },
  VictoryLine: {
    data: datasets.line,
    height,
    padding,
    style: {
      data: {
        stroke: colorScale[3],
      },
    },
  },
  VictoryArea: {
    data: datasets.area,
    height,
    interpolation: "cardinal",
    padding,
    style: {
      data: {
        fill: colorScale[2],
        stroke: "transparent",
      },
    },
  },
  VictoryScatter: {
    data: datasets.scatter,
    size: 7,
    height,
    padding,
    style: {
      data: {
        stroke: "transparent",
      },
    },
  },
  VictoryCandlestick: {
    data: datasets.candlestick,
    height,
    padding,
    style: {
      data: {
        fill: colorScale[3],
        stroke: colorScale[2],
      },
    },
  },
};
