import React from "react";
import "./sidebar.css";

import {
  AccountTree,
  LineStyle,
  CompareArrows,
  NotificationsActive,
  Folder,
  AccountCircle,
  BarChart,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              <NavLink
                to="/"
                className={(e) =>
                  "sidebarListItem" + (e.isActive ? " active" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <Folder className="sidebarIcon" />
              Provider's data
            </li>
            <li className="sidebarListItem">
              <AccountTree className="sidebarIcon" />

              <NavLink
                to="/ontologies"
                className={(e) =>
                  "sidebarListItem" + (e.isActive ? " active" : "")
                }
              >
                Ontologies
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <CompareArrows className="sidebarIcon" />
              <NavLink
                to="/mappings"
                className={(e) =>
                  "sidebarListItem" + (e.isActive ? " active" : "")
                }
              >
                Mappings options
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <CompareArrows className="sidebarIcon" />
              <NavLink
                to="/mappings-options"
                className={(e) =>
                  "sidebarListItem" + (e.isActive ? " active" : "")
                }
              >
                Mappings Options
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Statistics</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Statistics
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">System</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <NotificationsActive />
              Notifications
            </li>
            <li className="sidebarListItem">
              <AccountCircle />
              Account
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
