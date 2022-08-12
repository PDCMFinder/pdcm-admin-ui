import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import "./dashboard.css";
import {
  AccountTree,
  BarChart,
  CompareArrows,
  Folder,
} from "@mui/icons-material";
import { Divider } from "@mui/material";

export const ListItems = (
  <React.Fragment>
    <Link to="/" className="link">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <ListItemButton disabled={true}>
      <ListItemIcon>
        <Folder />
      </ListItemIcon>
      <ListItemText primary="Provider's data" />
    </ListItemButton>
    <Link to="/ontologies" className="link">
      <ListItemButton>
        <ListItemIcon>
          <AccountTree />
        </ListItemIcon>
        <ListItemText primary="Ontologies" />
      </ListItemButton>
    </Link>
    <Link to="/mappings-options" className="link">
      <ListItemButton>
        <ListItemIcon>
          <CompareArrows />
        </ListItemIcon>
        <ListItemText primary="Mappings Options" />
      </ListItemButton>
    </Link>
    <Link to="/search" className="link">
      <ListItemButton>
        <ListItemIcon>
          <CompareArrows />
        </ListItemIcon>
        <ListItemText primary="Mappings(*)" />
      </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} />
    <Link to="/" className="link">
      <ListItemButton>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
