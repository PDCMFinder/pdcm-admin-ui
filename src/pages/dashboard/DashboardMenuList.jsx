import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";
import "./dashboard.css";

import { Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFolder,
  faFolderTree,
  faGauge,
  faMagnifyingGlass,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";

export const ListItems = (
  <React.Fragment>
    <Link to="/" className="link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon className="fa-1x" icon={faGauge} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <ListItemButton disabled={true}>
      <ListItemIcon>
        <FontAwesomeIcon className="fa-1x" icon={faFolder} />
      </ListItemIcon>
      <ListItemText primary="Provider's data" />
    </ListItemButton>
    <Link to="/ontologies" className="link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon className="fa-1x" icon={faFolderTree} />
        </ListItemIcon>
        <ListItemText primary="Ontologies" />
      </ListItemButton>
    </Link>
    <Link to="/mappings-options" className="link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon className="fa-1x" icon={faRightLeft} />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItemButton>
    </Link>
    <Link to="/search" className="link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon className="fa-1x" icon={faMagnifyingGlass} />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItemButton>
    </Link>
    <Divider sx={{ my: 1 }} />
    <Link to="/" className="link">
      <ListItemButton>
        <ListItemIcon>
          <FontAwesomeIcon className="fa-1x" icon={faChartLine} />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
