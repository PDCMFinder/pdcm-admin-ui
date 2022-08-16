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

const TabsByStatus = ({ value, onTabChanged }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={onTabChanged}
          aria-label="basic tabs example"
        >
          <Tab label="Unmapped" {...a11yProps(0)} />
          <Tab label="Mapped" {...a11yProps(1)} />
          <Tab label="Revise" {...a11yProps(2)} />
          <Tab label="Request" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
};

export default TabsByStatus;
