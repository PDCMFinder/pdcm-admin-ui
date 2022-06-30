import { ResponsivePie } from "@nivo/pie";
import React from "react";

const DashboardPieChart = ({ title, data }) => {
  console.log("pie data", data);
  return (
    <>
      <div className="verticalTitle">{title}</div>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 80, bottom: 20, left: 60 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "blues" }}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 5]] }}
        arcLinkLabelsStraightLength={5}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsSkipAngle={10}
      />
    </>
  );
};

export default DashboardPieChart;
