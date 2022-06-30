import React from "react";
import { createStyles, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 26,
        borderRadius: 2,
      },
      value: {
        position: "absolute",
        lineHeight: "24px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      },
      bar: {
        height: "100%",
        "&.low": {
          backgroundColor: "#f00c0c",
        },
        "&.medium": {
          backgroundColor: "#f0890c",
        },
        "&.high": {
          backgroundColor: "#f2e85a",
        },
        "&.full": {
          backgroundColor: "#086e08",
        },
      },
    }),
  { defaultTheme }
);

const MappingsProgressBar = React.memo(function MappingsProgressBar(props) {
  const { value } = props;
  const valueInPercent = Number(value * 100).toFixed(1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.value}
      >{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx(classes.bar, {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70,
          full: valueInPercent >= 100,
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  );
});
export function renderMappingsProgress(params) {
  return <MappingsProgressBar value={Number(params.value)} />;
}
