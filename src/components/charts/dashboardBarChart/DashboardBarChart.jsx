import { ResponsiveBar } from "@nivo/bar";
import React from "react";
import "./dashboardBarChart.css";

const DashboardBarChart = ({ title, data, indexKey, keys }) => {
  return (
    <>
      <div className="verticalTitle">{title}</div>

      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexKey}
        margin={{ top: 50, right: 130, bottom: 50, left: 150 }}
        padding={0.3}
        animate={false}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["#7687cf", "#70c478"]}
        layout="horizontal"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of terms",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 30,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Mapped and unmapped terms count"
      />
    </>
  );
};

export default DashboardBarChart;
