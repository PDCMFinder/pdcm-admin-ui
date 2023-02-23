import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabsByStatus = ({
  value,
  countsByStatus,
  loadingCountsByStatus,
  onTabChanged,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={onTabChanged} aria-label="tabs by status">
          {loadingCountsByStatus && [
            <Tab key={0} label="Unmapped" {...a11yProps(0)} />,
            <Tab key={2} label="Mapped" {...a11yProps(1)} />,
            <Tab key={3} label="Review" {...a11yProps(2)} />,
            <Tab key={4} label="Request" {...a11yProps(3)} />,
          ]}
          {!loadingCountsByStatus && [
            <Tab
              key={0}
              label={"Unmapped (" + countsByStatus["Unmapped"] + ")"}
              {...a11yProps(0)}
            />,
            <Tab
              key={1}
              label={"Mapped (" + countsByStatus["Mapped"] + ")"}
              {...a11yProps(1)}
            />,
            <Tab
              key={2}
              label={"Review (" + countsByStatus["Review"] + ")"}
              {...a11yProps(2)}
            />,
            <Tab
              key={3}
              label={"Request (" + countsByStatus["Request"] + ")"}
              {...a11yProps(3)}
            />,
          ]}
        </Tabs>
      </Box>
    </Box>
  );
};

export default TabsByStatus;
