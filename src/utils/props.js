import { datasets } from "./datasets";
import { colorScale } from "./colors";

const height = 300;
const padding = 30;

export const defaultDuration = { duration: 400 };

export const shadowProps = {
  elevation: 3,
  shadowColor: colorScale[0],
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
};

export const defaultPropMap = {
  VictoryPie: {
    colorScale,
    data: datasets.pie,
    endAngle: -180,
    height,
    padding,
    startAngle: 180,
    style: {
      parent: {
        alignSelf: "center",
      },
      labels: {
        fill: "none",
        stroke: "transparent",
      },
    },
    width: height,
  },
  VictoryBar: {
    data: datasets.bar,
    domain: { x: [0.75, 4.25] },
    height,
    padding,
    style: {
      data: {
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
    padding,
    interpolation: "cardinal",
    style: {
      data: {
        fill: "url(#linear)",
        stroke: "transparent",
      },
    },
  },
  VictoryScatter: {
    data: datasets.scatter,
    size: 7,
    height,
    padding,
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
      labels: {
        fill: colorScale[2],
        fontSize: 14,
        padding: 6,
      },
    },
  },
};
